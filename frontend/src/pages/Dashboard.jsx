import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      <div className="p-4">
        <h1>My dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
