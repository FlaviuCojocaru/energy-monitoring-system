import { useEffect, useState } from "react";

import "../../styles/dashboard.css";

function DashboardInfo({
  contentName,
  content,
  placeholder,
  buttonIcon: ButtonIcon,
  onClick,
}) {
  const [numContent, setNumContent] = useState(content.length);

  useEffect(() => {
    setNumContent(content.length);
  }, [content]);

  return (
    <div>
      <div className="top">
        <div>
          <h1>{contentName} Management</h1>
          <span>{numContent} Total</span>
        </div>
      </div>
      <div className="bottom">
        <input placeholder={placeholder}></input>
        <button className="dashboard-btn search-btn">Search</button>
        <button className="dashboard-btn add-btn" onClick={onClick}>
          <ButtonIcon className="btn-icon" />
          Add {contentName}
        </button>
      </div>
    </div>
  );
}

export default DashboardInfo;
