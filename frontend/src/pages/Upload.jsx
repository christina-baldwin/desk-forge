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

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex flex-col gap-4 p-4 items-left">
        <h1 className="text-2xl font-bold">
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
          className="underline px-4 py-2 border rounded cursor-pointer"
        >
          {file ? file.name : "Add a file"}
        </button>

        <input
          type="text"
          placeholder="Describe your key desk problems"
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
          >
            Upload
          </button>

          <button
            onClick={handleCancel}
            className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
          >
            Cancel
          </button>
        </div>

        <p className="italic">Accepted formats: JPG, PNG, GIF</p>
        <p className="italic">Max file size: 5MB</p>

        <button
          onClick={handlePopupVisibility}
          className="text-left italic underline cursor-pointer"
        >
          Click here for tips to get the best suggestions
        </button>

        <div
          className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ${
            popupVisible ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-4 bg-white p-10 rounded shadow">
            <h2 className="text-lg font-bold">
              Tips for Getting the Best Suggestions
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-5">
              <li>Ensure good lighting</li>
              <li>Avoid cluttered backgrounds</li>
              <li>Fit the whole desk in frame</li>
              <li>Write a clear description of the problem</li>
            </ul>
            <button
              onClick={handlePopupVisibility}
              className="mt-4 px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold">Latest Photo</h3>

        {uploadedUrl ? (
          <div className="max-w-xs mt-4 flex flex-col items-left gap-2">
            <img
              src={uploadedUrl}
              alt="Uploaded preview"
              className="max-w-xs max-h-64 rounded shadow"
            />
            <p>
              {desk.problems && desk.problems.length > 0
                ? `Existing problems: ${desk.problems}`
                : "No existing problems"}
            </p>

            {/* Need a patch request on the backend and to change to an input when clicked to edit problems */}
            <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
              Add/Edit Problems
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => handleGenerateSuggestions(desk._id)}
                disabled={loading}
                className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
              >
                {desk.suggestions && desk.suggestions.length > 0
                  ? "Regenerate Suggestions"
                  : "Generate Suggestions"}
              </button>
              <button
                onClick={() => handleDelete(desk._id)}
                className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>No photos yet, upload a photo to get started!</p>
        )}
        {/* Might need a better way to display this later */}
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Upload;
