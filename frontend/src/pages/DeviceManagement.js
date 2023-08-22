import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthTokens } from "../features/auth/authSlice";
import { getDevices, selectDevices } from "../features/devices/deviceSlice";
import DashboardInfo from "../components/dashboard/DashboardInfo";
import { ReactComponent as AddDeviceIcon } from "../images/add-device-icon.svg";
import DeviceTable from "../components/device/DeviceTable";
import DeviceModal from "../components/device/DeviceModal";
import { setActiveLink } from "../features/header/headerSlice";

function DeviceManagement() {
  const dispatch = useDispatch();
  const authTokens = useSelector(selectAuthTokens);
  const { devices } = useSelector(selectDevices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getDevices(authTokens));
    dispatch(setActiveLink("devices"));
  }, []);

  return (
    <div className="dashboard-info">
      <DeviceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DashboardInfo
        contentName={"Device"}
        content={devices}
        placeholder={"Search address, description ..."}
        buttonIcon={AddDeviceIcon}
        onClick={() => setIsModalOpen(true)}
      />
      <DeviceTable />
    </div>
  );
}

export default DeviceManagement;
