import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SideBar from "../components/SideBar";

// change this once on render
const apiUrl = "http://localhost:8080";

const Dashboard = () => {
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [desk, setDesk] = useState(null);
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

        setLastLogin(
          data.user.lastLogin
            ? new Date(data.user.lastLogin).toLocaleString()
            : ""
        );
        setPreviousLogin(
          data.user.previousLogin
            ? new Date(data.user.previousLogin).toLocaleString()
            : ""
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDesks = async () => {
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
          setDesk(data.desks[0]);
          setUploadedUrl(data.desks[0].imageUrl);
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchDesks();
  }, []);

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-8 pl-10 pt-10 pr-60 h-280 w-280 overflow-auto">
        <h1 className="font-heading text-dark text-3xl font-bold">
          Welcome Back!
        </h1>
        {/* need to add this: dynamically add since last logged in and last uploaded */}
        <div>
          <p className="font-body text-dark">
            Last logged in: {previousLogin || lastLogin || "Never"}
          </p>
          <p className="font-body text-dark">
            You last uploaded a desk photo [X] days ago!
          </p>
        </div>
        {/* need to add this: generate an ai desk summary, include here */}
        <div className="bg-slate-100 border border-slate-300 p-4 rounded-md mb-6">
          <h2 className="text-lg font-heading text-dark mb-2">Quick Summary</h2>
          <p className="font-body text-dark">[Include desk summary here]</p>
        </div>
        <div>
          <h2 className="font-heading text-dark text-xl font-bold">
            Latest Upload
          </h2>

          {uploadedUrl ? (
            <div className="mt-4 flex flex-col items-left gap-2">
              <img
                src={uploadedUrl}
                alt="Uploaded preview"
                className="max-w-xs max-h-64 border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg"
              />
            </div>
          ) : (
            <p>No photos yet, upload a photo to see it here!</p>
          )}
        </div>
        <div className="flex gap-6">
          <Link
            to="/upload"
            className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
          >
            Upload Photo
          </Link>
          <Link
            to="/suggestions"
            className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
          >
            View Suggestions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
