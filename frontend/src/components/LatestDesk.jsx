import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeskStore } from "../state/deskStore";

const apiUrl = "https://desk-forge.onrender.com";

const LatestDesk = () => {
  const { latestDesk, setLatestDesk, clearDesk } = useDeskStore();
  const [isEditingProblems, setIsEditingProblems] = useState(false);
  const [newProblems, setNewProblems] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleGenerateSuggestions = async () => {
    if (!latestDesk) return;

    setLoading(true);
    setMessage("Generating suggestions, please wait...");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${apiUrl}/ai/desks/${latestDesk._id}/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate suggestions");
      }

      const data = await response.json();

      setLatestDesk({ ...latestDesk, suggestions: data.suggestions });
      setMessage("Suggestions generated successfully!");
      navigate("/suggestions");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!latestDesk) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this desk?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/upload/desks/${latestDesk._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setMessage("Desk deleted successfully!");

      await fetchLatestDesk();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleProblemsSave = async () => {
    if (!latestDesk) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/upload/desks/${latestDesk._id}`, {
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

      setLatestDesk({ ...latestDesk, problems: newProblems });
      setIsEditingProblems(false);
      setNewProblems("");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!latestDesk) return <p>No desk uploaded yet</p>;

  return (
    <div>
      <h2 className="font-heading text-dark text-xl font-bold">
        Use the latest photo of your desk
      </h2>
      <div className="max-w-md mt-4 flex flex-col items-left gap-2">
        <img
          src={latestDesk.imageUrl}
          alt="Desk"
          className="max-w-full h-auto border-accent border-4 shadow-[0_0_0_4px_black] rounded-lg mb-4"
        />
      </div>

      {isEditingProblems ? (
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="text"
            value={newProblems}
            placeholder="Edit desk problems"
            onChange={(e) => setNewProblems(e.target.value)}
            className="px-4 py-4 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleProblemsSave}
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
        </div>
      ) : (
        <div className="flex gap-4 justify-between mb-4 px-4 py-4 border-2 text-dark font-body rounded-[5px]">
          <p className="font-body text-dark italic">
            {latestDesk.problems || "No problems listed"}
          </p>
          <button
            onClick={() => setIsEditingProblems(true)}
            className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Edit Problems
          </button>
        </div>
      )}

      <div className="flex gap-6 mb-6">
        <button
          onClick={handleGenerateSuggestions}
          disabled={loading}
          className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {latestDesk.suggestions?.length > 0
            ? "Regenerate Suggestions"
            : "Generate Suggestions"}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Delete
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
    </div>
  );
};

export default LatestDesk;
