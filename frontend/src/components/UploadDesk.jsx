import { useState, useEffect, useRef } from "react";
import { useDeskStore } from "../state/deskStore";

const apiUrl = "https://desk-forge.onrender.com";

const UploadDesk = () => {
  const setLatestDesk = useDeskStore((state) => state.setLatestDesk);
  const [file, setFile] = useState(null);
  const [problems, setProblems] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

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
        setLatestDesk(null);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchLatestDesk();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setMessage("");
    setProblems("");
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

      await response.json();

      setMessage("File uploaded successfully!");
      setProblems("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;

      fetchLatestDesk();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleCancel = () => {
    if (file) {
      setFile(null);
      setMessage("");
      setProblems("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile.type.startsWith("image/")) {
      setMessage("Only image files are allowed!");
      return;
    }

    setFile(droppedFile);
    setMessage("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className="font-heading text-dark text-xl font-bold focus:outline-none focus:ring-2 focus:ring-accent">
        Upload a new photo of your desk
      </h2>
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
        className="px-4 py-2 bg-light text-dark text-lg rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] underline focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {file ? file.name : "Add a file or drag here"}
      </button>
      <input
        type="text"
        placeholder="Describe your key desk problems"
        value={problems}
        onChange={(e) => setProblems(e.target.value)}
        className="px-4 py-4 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <div className="flex gap-6 mb-10">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Upload
        </button>

        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Cancel
        </button>
      </div>

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
    </>
  );
};

export default UploadDesk;
