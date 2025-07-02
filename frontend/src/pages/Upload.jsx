import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";

// change this once on render
const apiUrl = "http://localhost:8080";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const fileInputRef = useRef();

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

  const handleGenerateSuggestions = () => {
    // TODO: call the suggestions API
    alert("Suggestions triggered! (not implemented yet)");
  };

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex flex-col gap-4 p-4 items-left">
        <h1 className="text-2xl font-bold">Upload New Photo</h1>

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
          {file ? file.name : "Select a file to upload"}
        </button>

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

        <p>Accepted formats: JPG, PNG, GIF</p>
        <p>Max file size: 5MB</p>

        {message && <p className="mt-2 text-center">{message}</p>}

        {/* Preview uploaded image */}
        {uploadedUrl && (
          <div className="mt-4 flex flex-col items-left gap-2">
            <h3 className="text-xl font-bold">Latest photo</h3>
            <img
              src={uploadedUrl}
              alt="Uploaded preview"
              className="max-w-xs max-h-64 rounded shadow"
            />
            <button
              onClick={handleGenerateSuggestions}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Generate Suggestions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
