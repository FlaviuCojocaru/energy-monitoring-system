import { Link } from "react-router-dom";

function UserPageSection({ image: Image, item, color, swap }) {
  if (swap) {
    return (
      <div className={`userpage-section ${color}`}>
        <div className="userpage-description">
          <h2>Manage {item}</h2>
          <p>Create, read, update, delete {item}.</p>
          <Link to={`/${item}`}>{"> Get Started"}</Link>
        </div>
        <Image className="userpage-image" />
      </div>
    );
  } else {
    return (
      <div className={`userpage-section ${color}`}>
        <Image className="userpage-image" />
        <div className="userpage-description">
          <h2>Manage {item}</h2>
          <p>Create, read, update, delete {item}.</p>
          <Link to={`/${item}`}>{"> Get Started"}</Link>
        </div>
      </div>
    );
  }
}

export default UserPageSection;
