import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-light border-6 rounded-lg shadow-lg pt-10 pl-8 pr-8">
      <ul className="flex flex-col gap-4 ">
        <li className="font-heading text-dark text-lg hover:underline">
          <Link
            to="/dashboard"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Home
          </Link>
        </li>
        <li className="font-heading text-dark text-lg hover:underline">
          <Link
            to="/upload"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {" "}
            Analyse
          </Link>
        </li>

        <li className="font-heading text-dark text-lg hover:underline">
          <Link
            to="/suggestions"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Suggestions
          </Link>
        </li>

        <li className="font-heading text-dark text-lg hover:underline">
          <Link
            to="/settings"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
