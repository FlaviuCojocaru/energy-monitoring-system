import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../../styles/header.css";
import { selectActiveLink } from "../../features/header/headerSlice";

function CustomLink({ text, path, linkIcon: LinkIcon }) {
  const activeLink = useSelector(selectActiveLink);
  const isActive = text.toLowerCase() === activeLink;

  return (
    <Link to={path}>
      <div className={isActive ? "header-link active-item" : "header-link"}>
        <LinkIcon className="header-icon" />
        <span>{text}</span>
      </div>
    </Link>
  );
}

export default CustomLink;
