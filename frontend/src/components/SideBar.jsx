import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-light border-4 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <ul className="flex flex-row flex-wrap md:flex-col gap-4 justify-around md:justify-start">
        <li className="font-heading text-dark text-xl sm:text-2xl hover:underline">
          <Link
            to="/dashboard"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Home
          </Link>
        </li>

        <li className="font-heading text-dark text-xl sm:text-2xl hover:underline">
          <Link
            to="/upload"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Analyse
          </Link>
        </li>

        <li className="font-heading text-dark text-xl sm:text-2xl hover:underline">
          <Link
            to="/suggestions"
            className="focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Suggestions
          </Link>
        </li>

        <li className="font-heading text-dark text-xl sm:text-2xl hover:underline">
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
