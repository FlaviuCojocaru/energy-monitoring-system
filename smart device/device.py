import sys
import csv
import json
import pika
import yaml
import signal
import argparse
import time
from datetime import datetime, timedelta


class AMQPProducer:
    def __init__(self, amqp_url=None, queue_name=None, device_id=None):
        self.connection = None
        self.channel = None
        self.amqp_url = amqp_url
        self.queue_name = queue_name
        self.device_id = device_id

    # create a communication channel with the message broker
    def connect_to_broker(self, config, verbose=False):
        if verbose:
            print(f"[device {self.device_id}]: Starting the simulation...")
            print(f"[device {self.device_id}]: Reading the measurements from {config['measurements_file']}")

            start_days_ago = config.get("start_days_ago", 0)  # default to 0 if not specified
            if start_days_ago > 0:
                print(f"[device {self.device_id}]: Simulation will start storing data {start_days_ago} days ago.")

            measurement_interval = config.get("measurement_interval", 10)  # Default to 10 if not specified
            print(f"[device {self.device_id}]: Measurement interval is {measurement_interval} minutes.")

            wait_interval = config.get("wait_interval", 0)  # Default to 0 if not specified
            print(f"[device {self.device_id}]: The simulated waiting time beetween measurements is {wait_interval} seconds.")

            print(f"[device {self.device_id}]: Sending the measurements to the queue {self.queue_name}")

        params = pika.URLParameters(self.amqp_url)
        self.connection = pika.BlockingConnection(params)
        self.channel = self.connection.channel()
        self.queue_name = self.queue_name
        self.device_id = self.device_id

        # making sure the queue exists
        self.channel.queue_declare(queue=self.queue_name, durable=True)  # declare a queue

        if verbose:
            print(f"[device {self.device_id}]: Connection established with the cloudamqp server!")
            print(f"[device {self.device_id}]: Press CTRL+C to exit...\n\n")

    # close the connection with the message broker
    def close_connection(self, sig=False, frame=False):
        print(f"\n[device {self.device_id}]: Closing connection...")
        self.connection.close()  # close the connection
        exit(1)  # exit the program

    def send_measurement(self, measurement, timestamp, wait_time, verbose=False):
        if verbose:
            print(f"[device {self.device_id}] Sending data...")

        message = {
            "timestamp": timestamp,
            "device_id": self.device_id,
            "measurement_value": measurement,
        }
        json_message = json.dumps(message)

        # send the data
        self.channel.basic_publish(
            exchange="",
            routing_key=self.queue_name,
            body=json_message,
            properties=pika.BasicProperties(delivery_mode=2),  # make the message persistent
        )

        # Simulate the waiting time between measurements
        time.sleep(wait_time)

        if verbose:
            message["timestamp"] = datetime.fromtimestamp(timestamp).strftime("%d.%b.%G %H:%M:%S")
            print(message)
            print(f"[device {self.device_id}] Data sent!\n\n")

    # simulate the smart metering device
    def simulate(self, config, verbose=False):
        # the time interval between measurements used in database
        measurement_interval = timedelta(minutes=config.get("measurement_interval", 10))

        # the time used to simulate the waiting time between measurements
        wait_interval = config.get("wait_interval", 0)

        # the initial timestamp is the current time minus the number of days specified in the configuration file
        initial_timestamp = int(time.time() - int(config.get("start_days_ago", 0)) * 24 * 3600)
        
        # read the measurements from the file
        with open(config["measurements_file"], newline="") as csvfile:
            csv_reader = csv.reader(csvfile)

            # send the measurements
            for row in csv_reader:
                timestamp = initial_timestamp

                # send the measurement
                self.send_measurement(
                    measurement=row[0],
                    timestamp=timestamp,
                    wait_time=wait_interval,
                    verbose=verbose,
                )

                # update timestamp
                initial_timestamp += measurement_interval.total_seconds()


def main(config, device_id, verbose=False):
    # create an AMQPProducer object
    amqpProducer = AMQPProducer(config["AMQP_URL"], config["QUEUE_NAME"], device_id)

    # establish the connection with the cloudamqp server
    amqpProducer.connect_to_broker(config, verbose=verbose)

    # detect CTRL+C and stop consuming
    signal.signal(signal.SIGINT, amqpProducer.close_connection)

    # simulate the smart metering device
    amqpProducer.simulate(config=config, verbose=verbose)

    # close the connection
    amqpProducer.close_connection()


if __name__ == "__main__":
    # parse the command line arguments
    parser = argparse.ArgumentParser(description="Smart Metering Device Simulator")
    parser.add_argument("-c", "--config", default="../configs/simulation.yaml")
    parser.add_argument("-v", "--verbose", action="store_true")
    parser.add_argument("-d", "--device_id", required=True)
    args = parser.parse_args()

    # load the configuration file
    with open(args.config, "r") as file:
        config = yaml.safe_load(file)

    main(config=config, device_id=args.device_id, verbose=args.verbose)
