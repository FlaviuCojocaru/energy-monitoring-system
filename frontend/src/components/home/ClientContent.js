import { useSelector } from "react-redux";
import { Fragment } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { selectClientActiveLink } from "../../features/nav/navSlice";
import DeviceCard from "../device/DeviceCard";
import { ReactComponent as HomeIcon } from "../../images/smart-home1.svg";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 500, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 900, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 100, pv: 2400, amt: 2400 },
];

function ClientContent() {
  const activeLink = useSelector(selectClientActiveLink);

  const renderLineChart = (
    <LineChart width={1000} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#6aba2f" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  // display client's devices
  if (activeLink === "my-devices") {
    return (
      <Fragment>
        <div className="devices-title">
          <HomeIcon className="home-icon" />
          <span>My devices: </span>
        </div>
        <DeviceCard />
      </Fragment>
    );
  }

  // display the energy consumption chart
  return (
    <div>
      <div className="device-input">
        <span>Device: </span>
        <select name="pets" id="pet-select">
          <option value="">--Please choose a device--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
      <div className="date-input">
        <span>Date: </span>
        <input
          type="date"
          //   id="start"
          //   name="trip-start"
          //   value="2018-07-22"
          //   min="2018-01-01"
          //   max="2018-12-31"
        />
      </div>
      {renderLineChart}
    </div>
  );
}

export default ClientContent;
