import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import SideBar from "../components/SideBar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <div>
          <h2>Latest Upload</h2>
          <img />
        </div>
        <div className="flex gap-2">
          <Link
            to="/upload"
            className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
          >
            Upload Photo
          </Link>
          <Link
            to="/suggestions"
            className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
          >
            View Suggestions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
