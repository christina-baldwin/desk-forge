import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeskStore } from "../state/deskStore";
import { motion } from "framer-motion";

import SideBar from "../components/SideBar";

const apiUrl = "https://desk-forge.onrender.com";

const Dashboard = () => {
  const { latestDesk, setLatestDesk, clearDesk } = useDeskStore();
  const [lastLogin, setLastLogin] = useState("");
  const [previousLogin, setPreviousLogin] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${apiUrl}/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        console.log(data);

        setLastLogin(data.user.lastLogin || "");
        setPreviousLogin(data.user.previousLogin || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const fetchLatestDesk = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/upload/desks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch desks");

      const data = await response.json();

      if (data.desks && data.desks.length > 0) {
        setLatestDesk(data.desks[0]);
      } else {
        clearDesk();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchLatestDesk();
  }, [setLatestDesk, clearDesk]);

  const formatDate = (dateString) => {
    if (!dateString) return "Never";

    const date = new Date(dateString);
    const now = new Date();

    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowOnly - dateOnly;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-8">
      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SideBar />

        <div
          className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-10 
                  p-4 sm:p-6 md:p-10 w-full md:w-[720px] lg:w-[700px] xl:w-[900px] 
                  mx-auto h-[80vh] overflow-auto overflow-y-auto"
        >
          <h1 className="font-heading text-dark text-3xl sm:text-4xl md:text-4xl font-bold text-center md:text-left">
            Welcome Back!
          </h1>
          <div className="text-center md:text-left">
            <p className="font-body text-dark">
              Last logged in:{" "}
              {formatDate(previousLogin) || formatDate(lastLogin)}
            </p>
            <p className="font-body text-dark">
              You last uploaded a desk photo {formatDate(latestDesk?.createdAt)}
              !
            </p>
          </div>
          <div className="mb-4 px-5 py-6 border-2 text-dark font-body rounded-[5px]">
            <h2 className="text-lg font-heading text-dark mb-2">
              Summary of Your Latest Desk Setup
            </h2>
            <p className="font-body text-dark">
              {latestDesk?.summary
                ? latestDesk?.summary
                : "No summary available."}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-center md:text-left text-dark text-xl font-bold mb-10">
              Latest Desk Setup
            </h2>
            {latestDesk?.imageUrl ? (
              <div>
                <img
                  src={latestDesk?.imageUrl}
                  alt="Uploaded preview"
                  className="max-w-2xs sm:max-w-xs max-h-64 border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg"
                />
              </div>
            ) : (
              <p className="text-center md:text-left">
                No photos yet, upload a photo to see it here!
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <Link
              to="/upload"
              className="px-4 py-2 text-center bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Analyse Desk
            </Link>
            <Link
              to="/suggestions"
              className="px-4 py-2 text-center bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              View Suggestions
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
