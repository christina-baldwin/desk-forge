import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";

// change this once on render
const apiUrl = "http://localhost:8080";

const Suggestions = () => {
  const [desk, setDesk] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [message, setMessage] = useState("");

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
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Suggestions</h1>
        {uploadedUrl ? (
          <div className="mt-4 flex flex-col items-left gap-2">
            <img
              src={uploadedUrl}
              alt="Uploaded preview"
              className="max-w-xs max-h-64 rounded shadow"
            />
          </div>
        ) : (
          <p>No photos yet, upload a photo to get started!</p>
        )}
        {desk && desk.suggestions && desk.suggestions.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Suggestions:</h2>
            <ul className="list-disc list-inside">
              {desk.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>
            No suggestions available, upload a photo and generate suggestions to
            get started.
          </p>
        )}
        {/* Might need a better way to display this later */}

        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Suggestions;
