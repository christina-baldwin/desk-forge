import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SideBar from "../components/SideBar";

// change this once on render
const apiUrl = "http://localhost:8080";

const Dashboard = () => {
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [desk, setDesk] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

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
      <div className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-8 pl-10 pt-10 pb-60 pr-60">
        <h1 className="font-heading text-dark text-2xl font-bold">
          Welcome Back!
        </h1>
        <p className="font-body text-dark">This is your dashboard!</p>
        <div>
          <h2 className="font-heading text-dark text-xl font-bold">
            Latest Upload
          </h2>
          {/* Preview uploaded image */}
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
