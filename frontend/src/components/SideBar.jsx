import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <ul className="flex flex-col gap-2 p-4">
        <Link to="/dashboard">
          <li>Home</li>
        </Link>
        <Link to="/upload">
          <li>Upload & Generate</li>
        </Link>
        <Link to="/suggestions">
          <li>Suggestions</li>
        </Link>
        <Link to="/settings">
          <li>Settings</li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
