import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

// change this once on render
const apiUrl = "http://localhost:8080";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [desk, setDesk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [isEditingProblems, setIsEditingProblems] = useState(false);
  const [newProblems, setNewProblems] = useState("");
  const fileInputRef = useRef();

  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size exceeds 5MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("problems", problems);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();

      setMessage("File uploaded successfully!");
      setUploadedUrl(data.url);
    } catch (error) {
      setMessage(error.message);
      setUploadedUrl("");
    }
  };

  const handleCancel = () => {
    setFile(null);
    setMessage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
    setMessage("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleGenerateSuggestions = async (deskId) => {
    setLoading(true);
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
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-6 pl-10 pt-10 pr-60 h-280 w-280 overflow-auto">
        <h1 className="font-heading text-dark text-3xl font-bold">
          Upload Photo & Generate Suggestions
        </h1>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button
          onClick={handleSelectClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="px-4 py-2 bg-light text-dark text-lg rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] underline"
        >
          {file ? file.name : "Add a file or drag here"}
        </button>

        <input
          type="text"
          placeholder="Describe your key desk problems"
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
          className="px-4 py-4 border-2 text-dark font-body rounded-[5px] mb-2"
        />

        <button
          onClick={handlePopupVisibility}
          className="text-left italic underline cursor-pointer mb-4"
        >
          Click here for tips & requirements
        </button>

        <div
          className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 ${
            popupVisible ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-6 bg-light rounded-lg p-20 max-w-lg border-accent border-4 shadow-[0_0_0_4px_black]">
            <h2 className="text-2xl font-heading text-dark font-bold">
              Tips & Requirements
            </h2>
            <ul className="flex flex-col gap-2 font-body list-disc pl-5 italic">
              <li>Accepted formats: JPG, PNG, GIF</li>
              <li>Max file size: 5MB</li>
              <li>Ensure good lighting</li>
              <li>Avoid cluttered backgrounds</li>
              <li>Fit the whole desk in frame</li>
              <li>Write a clear description of the problem</li>
            </ul>
            <button
              onClick={handlePopupVisibility}
              className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
          >
            Upload
          </button>

          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
          >
            Cancel
          </button>
        </div>

        <h3 className="text-xl font-bold">Latest Photo</h3>

        {uploadedUrl ? (
          <div className="max-w-md mt-4 flex flex-col items-left gap-2">
            <img
              src={uploadedUrl}
              alt="Uploaded preview"
              className="max-w-md border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg mb-4"
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
                      className="px-4 py-4 border-2 text-dark font-body rounded-[5px] mb-2"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={handleProblemsSave}
                    className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingProblems(false)}
                    className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4 items-center mb-4 px-4 py-4 border-2 text-dark font-body rounded-[5px]">
                <p className="font-body text-dark italic">
                  {desk.problems && desk.problems.length > 0
                    ? `Existing problems: ${desk.problems}`
                    : "No existing problems"}
                </p>
                <button
                  onClick={() => setIsEditingProblems(true)}
                  className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
                >
                  Edit
                </button>
              </div>
            )}

            <div className="flex gap-6">
              <button
                onClick={() => handleGenerateSuggestions(desk._id)}
                disabled={loading}
                className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
              >
                {desk.suggestions && desk.suggestions.length > 0
                  ? "Regenerate Suggestions"
                  : "Generate Suggestions"}
              </button>
              <button
                onClick={() => handleDelete(desk._id)}
                className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>No photos yet, upload a photo to get started!</p>
        )}
        {/* Might need a better way to display this later */}
        {message && (
          <p className="font-body text-dark uppercase mt-10 text-center bg-slate-100 border border-accent p-4 rounded-md">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
