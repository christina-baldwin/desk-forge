import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";

// change this once on render
const apiUrl = "http://localhost:8080";

const Suggestions = () => {
  const [latestDesk, setLatestDesk] = useState(null);
  const [prevDesk, setPrevDesk] = useState(null);
  const [message, setMessage] = useState("");
  const [visibleOlderSuggestions, setVisibleOlderSuggestions] = useState(false);

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
          setLatestDesk(data.desks[0]);
          setPrevDesk(data.desks[1] || null);
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchDesks();
  }, []);

  const handleViewOlderSuggestions = () => {
    setVisibleOlderSuggestions(!visibleOlderSuggestions);
  };

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Suggestions</h1>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Latest suggestions:</h2>
          {latestDesk &&
          latestDesk.suggestions &&
          latestDesk.suggestions.length > 0 ? (
            <div className="mt-4">
              <div className="mt-4 flex flex-col items-left gap-2">
                <img
                  src={latestDesk.imageUrl}
                  alt="Uploaded preview"
                  className="max-w-xs max-h-64 rounded shadow mb-2"
                />
              </div>
              <ul className="list-disc list-inside">
                {latestDesk.suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <strong>{suggestion.title}</strong>:{" "}
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>
              No suggestions available, upload a photo and generate suggestions
              to get started.
            </p>
          )}
        </div>

        <button
          onClick={handleViewOlderSuggestions}
          className="mt-10 px-3 py-2 border-2 rounded-[5px] cursor-pointer"
        >
          {visibleOlderSuggestions
            ? "Hide older suggestions"
            : "Load older suggestions"}
        </button>

        <div
          className={`mt-10 ${visibleOlderSuggestions ? "block" : "hidden"}`}
        >
          <h2 className="text-xl font-semibold">Previous suggestions:</h2>
          {prevDesk &&
          prevDesk.suggestions &&
          prevDesk.suggestions.length > 0 ? (
            <div className="mt-4">
              <div className="mt-4 flex flex-col items-left gap-2">
                <img
                  src={prevDesk.imageUrl}
                  alt="Uploaded preview"
                  className="max-w-xs max-h-64 rounded shadow mb-2"
                />
              </div>
              <ul className="list-disc list-inside">
                {prevDesk.suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <strong>{suggestion.title}</strong>:{" "}
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>
              No other desks available, upload a new photo and generate
              suggestions to get started.
            </p>
          )}
        </div>
        {/* Might need a better way to display this later */}

        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Suggestions;
