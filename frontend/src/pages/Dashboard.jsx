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
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p>This is your dashboard!</p>
        <div>
          <h2 className="text-xl font-bold">Latest Upload</h2>
          {/* Preview uploaded image */}
          {uploadedUrl ? (
            <div className="mt-4 flex flex-col items-left gap-2">
              <img
                src={uploadedUrl}
                alt="Uploaded preview"
                className="max-w-xs max-h-64 rounded shadow"
              />
            </div>
          ) : (
            <p>No photos yet, upload a photo to see it here!</p>
          )}
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
