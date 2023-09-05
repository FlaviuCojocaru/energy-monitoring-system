import pika
import json
import signal
import yaml
from datetime import datetime
from django.core.management.base import BaseCommand, CommandError

from sensors.models import Sensor, Measurement

AMQP_URL = "amqps://adzjuewb:vivV8xr1KlREvxRgefyEDsljsc6BpOZV@sparrow.rmq.cloudamqp.com/adzjuewb"
QUEUE_NAME = "test_queue2"


class AMQPConsumer:
    def __init__(self, command=None):
        self.connection = None
        self.channel = None
        self.config = None
        self.command = command
        self.data = {}
        
    # setter for the config attribute
    def set_config(self, config):
        self.config = config

    # create a communication channel with the message broker
    def connect_to_broker(self, amqp_url):
        params = pika.URLParameters(amqp_url)
        self.connection = pika.BlockingConnection(params)
        self.channel = self.connection.channel()

        # making sure the queue exists
        self.channel.queue_declare(queue=QUEUE_NAME, durable=True)  # declare a queue

        # subscribe a callback function to the queue
        self.channel.basic_consume(queue=QUEUE_NAME, on_message_callback=self.callback)

    # close the connection with the message broker
    def close_connection(self, sig, frame):
        # close the connection    
        print(f"\n[consumer] Closing connection...")
        self.connection.close()  # close the connection
        exit(1)  # exit the program

    def start_consuming(self):
        print("[consumer] Waiting for messages. To exit press CTRL+C")
        self.channel.start_consuming()
    
    # save the measurement to the database    
    def _save_data_to_db(self, device_id, measurement_value, timestamp):
        sensor = Sensor.objects.filter(device__id=device_id).first()
        measurement = Measurement(
            sensor_id=sensor.id,
            value=measurement_value,
            timestamp=timestamp,
        )
        measurement.save()
        
        # display the saved measurement in the terminal
        self.command.stdout.write(
            self.command.style.SUCCESS(
                f"[consumer] Saving [{device_id}, {measurement_value}, {timestamp}] to db..."
            )
        )
        
    def process_data(self, message, bulk=False):
        device_id = int(message["device_id"])
        measurement_value = float(message["measurement_value"])
        timestamp = datetime.fromtimestamp(message["timestamp"])
        measurement_interval = int(self.config['measurement_interval']) # in minutes        
        num_measurements_per_hour = (60 // measurement_interval)
        
        if device_id not in self.data:
            self.data[device_id] = []
            self._save_data_to_db(device_id, measurement_value, timestamp)
        else:
            self.data[device_id].append(measurement_value)
            
            # if we have enough measurements for an hour 
            # then compute the energy consumption and save it to the database
            if len(self.data[device_id]) == num_measurements_per_hour:
                # compute the energy consumption
                measurement = self.data[device_id][-1] - self.data[device_id][0]
                
                # save the measurement in the database
                self._save_data_to_db(device_id, measurement, timestamp)
                        
                # reset the data list
                self.data[device_id] = []
        
    def callback(self, ch, method, properties, message):
        message = json.loads(message)
        wait_interval = int(self.config.get("wait_interval", 0))
        self.process_data(message, bulk=wait_interval > 0)
        ch.basic_ack(delivery_tag=method.delivery_tag)  # acknowledge the message


class Command(BaseCommand):
    help = "Run a message consumer for the message broker middleware"

    def __init__(self):
        super().__init__()
        self.AMQPConsumer = AMQPConsumer(self)  # create an AMQPConsumer object
            
    def add_arguments(self, parser):
        # configuration file argument
        parser.add_argument(
            "--config",
            default="../configs/simulation.yaml",
            help="Path to the configuration file",
        )

    def handle(self, *args, **options):
        
        # load the configuration file
        with open(options["config"], "r") as file:
            config = yaml.safe_load(file)
            self.AMQPConsumer.set_config(config)
        
        # establish the connection with the cloudamqp server
        self.AMQPConsumer.connect_to_broker(AMQP_URL)
        
        # detect CTRL+C and stop consuming
        signal.signal(signal.SIGINT, self.AMQPConsumer.close_connection)

        # start consuming
        self.AMQPConsumer.start_consuming()
