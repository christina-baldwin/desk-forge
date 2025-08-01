import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-light border-6 rounded-lg shadow-lg min-h-screen">
      <ul className="flex flex-col gap-4 p-4">
        <Link to="/dashboard">
          <li className="font-heading text-dark text-lg hover:underline">
            Home
          </li>
        </Link>
        <Link to="/upload">
          <li className="font-heading text-dark text-lg hover:underline">
            Upload & Generate
          </li>
        </Link>
        <Link to="/suggestions">
          <li className="font-heading text-dark text-lg hover:underline">
            Suggestions
          </li>
        </Link>
        <Link to="/settings">
          <li className="font-heading text-dark text-lg hover:underline">
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
