import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardInfo from "../components/dashboard/DashboardInfo";
import { ReactComponent as AddSensorIcon } from "../images/add-sensor-icon.svg";
import SensorModal from "../components/sensor/SensorModal";
import { getSensors, selectSensors } from "../features/sensor/sensorSlice";
import { selectAuthTokens } from "../features/auth/authSlice";
import SensorTable from "../components/sensor/SensorTable";

function SensorManagement() {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const { sensors } = useSelector(selectSensors);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getSensors(authTokens));
  }, []);

  return (
    <div className="dashboard-info">
      <SensorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DashboardInfo
        contentName={"Sensor"}
        content={sensors}  // todo ca sa calculeze nr elm
        placeholder={"Search sensor id, description ..."}
        buttonIcon={AddSensorIcon}
        onClick={() => setIsModalOpen(true)}
      />
      <SensorTable />
    </div>
  );
}

export default SensorManagement;
