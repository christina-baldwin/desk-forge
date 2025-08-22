import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import UploadDesk from "../components/UploadDesk";
import { useDeskStore } from "../state/deskStore";
import { LightBulbIcon } from "@heroicons/react/24/outline";

const apiUrl = "https://desk-forge.onrender.com";

const Upload = () => {
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [desk, setDesk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayProblems, setDisplayProblems] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [isEditingProblems, setIsEditingProblems] = useState(false);
  const [newProblems, setNewProblems] = useState("");

  const navigate = useNavigate();

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
        setDesk(data.desks[0]);
        setUploadedUrl(data.desks[0].imageUrl);
      } else {
        setDesk(null);
        setUploadedUrl("");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchLatestDesk();
  }, []);

  const handleGenerateSuggestions = async (deskId) => {
    setLoading(true);
    setMessage("Generating suggestions, please wait...");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/ai/desks/${deskId}/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate suggestions");
      }

      const data = await response.json();

      setDesk((prev) => ({ ...prev, suggestions: data.suggestions }));
      setMessage("Suggestions generated successfully!");
      navigate("/suggestions");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (deskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this desk?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/upload/desks/${deskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setMessage("File deleted successfully!");
      setUploadedUrl("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePopupVisibility = () => {
    setPopupVisible(!popupVisible);
  };

  const handleProblemsSave = async (deskId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/upload/desks/${deskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ problems: newProblems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update desk problems");
      }

      setDesk((prev) => ({ ...prev, problems: newProblems }));
      setIsEditingProblems(false);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const setLatestDesk = useDeskStore((state) => state.setLatestDesk);

  const handleUploadSuccess = (newDesk) => {
    setLatestDesk(newDesk); // update Zustand store
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8">
      <SideBar />

      <div
        className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-8 
                  p-4 sm:p-6 md:p-10 w-full md:w-[720px] lg:w-[900px] 
                  mx-auto md:mx-0 overflow-auto"
      >
        <h1 className="font-heading text-dark text-3xl sm:text-4xl md:text-4xl font-bold text-center md:text-left">
          Analyse Desk Setup
        </h1>
        <button
          onClick={handlePopupVisibility}
          className="flex items-center gap-2 text-left italic text-dark underline cursor-pointer mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <LightBulbIcon className="h-5 w-5 text-dark focus:outline-none focus:ring-2 focus:ring-accent" />
          Need help? Click here
        </button>
        <div
          className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 ${
            popupVisible ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-6 bg-light rounded-lg p-20 max-w-2xl border-accent border-4 shadow-[0_0_0_4px_black]">
            <h2 className="text-2xl font-heading text-dark font-bold">
              Tips & Requirements
            </h2>
            <ul className="flex flex-col gap-2 font-body list-disc pl-5 italic">
              <li>
                You can upload a new desk photo OR you can use an existing desk
                you have uploaded before, this is displayed below
              </li>
              <li>When taking a photo:</li>
              <ul className="flex flex-col gap-2 font-body list-decimal pl-5 italic">
                <li>Ensure good lighting</li>
                <li>Avoid cluttered backgrounds</li>
                <li>Fit the whole desk in frame</li>
              </ul>
              <li>When uploading:</li>
              <ul className="flex flex-col gap-2 font-body list-decimal pl-5 italic">
                <li>
                  Make sure to only upload accepted image formats: JPG, PNG, GIF
                </li>
                <li>Stay within the max file size of 5MB</li>
                <li>Write a clear description of the problem</li>
              </ul>
              <li>When generating from an existing desk:</li>
              <ul className="flex flex-col gap-2 font-body list-decimal pl-5 italic">
                <li>
                  Once a desk has been uploaded it gets saved in the latest desk
                  section
                </li>
                <li>
                  You can then generate suggestions, regenerate suggestions, add
                  new problems, or delete the desk
                </li>
              </ul>
            </ul>
            <button
              onClick={handlePopupVisibility}
              className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Close
            </button>
          </div>
        </div>

        <UploadDesk onUploadSuccess={handleUploadSuccess} />

        {/* DISPLAY LATEST DESK SECTION */}
        <h2 className="font-heading text-dark text-xl font-bold">
          Or use the latest photo of your desk
        </h2>
        {uploadedUrl ? (
          <div className="max-w-md mt-4 flex flex-col items-left gap-2">
            <img
              src={uploadedUrl}
              alt="Uploaded preview"
              className="max-w-full h-auto border-accent border-4 shadow-[0_0_0_4px_black] rounded-lg mb-4"
            />

            {isEditingProblems ? (
              <>
                <div className="flex flex-col gap-2 mb-2">
                  <div>
                    <input
                      type="text"
                      value={newProblems}
                      placeholder="Your edited desk problems"
                      onChange={(e) => setNewProblems(e.target.value)}
                      className="px-4 py-4 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => handleProblemsSave(desk._id)}
                    className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingProblems(false)}
                    className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4 justify-between mb-4 px-4 py-4 border-2 text-dark font-body rounded-[5px]">
                <p className="font-body text-dark italic">
                  {displayProblems && displayProblems.length > 0
                    ? `Existing problems: ${displayProblems}`
                    : "No existing problems"}
                </p>
                <button
                  onClick={() => setIsEditingProblems(true)}
                  className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Edit
                </button>
              </div>
            )}

            <div className="flex gap-6">
              <button
                onClick={() => handleGenerateSuggestions(desk._id)}
                disabled={loading}
                className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {desk.suggestions && desk.suggestions.length > 0
                  ? "Regenerate Suggestions"
                  : "Generate Suggestions"}
              </button>
              <button
                onClick={() => handleDelete(desk._id)}
                className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>No photos yet, upload a photo to get started!</p>
        )}
        {/* Might need a better way to display this later */}
        <div className="h-6 mb-2 w-full">
          {message && (
            <p
              className={`font-heading text-dark italic text-center bg-slate-100 border border-accent rounded-md transition-opacity duration-300 ${
                message ? "opacity-100" : "opacity-0"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;

// TO USE LATER ONCE COMPONENTS HAVE BEEN WORKED OUT
//  const [latestDesk, setLatestDesk] = useState(null);

//   return (
//     <div className="flex flex-col gap-8">
//       <UploadDesk onUploadSuccess={(desk) => setLatestDesk(desk)} />
//       <LatestDesk desk={latestDesk} />
//     </div>
//   );
