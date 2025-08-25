import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";
import { motion } from "framer-motion";

const apiUrl = "https://desk-forge.onrender.com";

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
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8">
      <motion.div
        className="flex flex-col md:flex-row gap-4 p-4 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SideBar />

        <div
          className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-8 
                  p-4 sm:p-6 md:p-10 w-full md:w-[720px] lg:w-[900px] 
                  mx-auto md:mx-0 overflow-auto"
        >
          <h1 className="font-heading text-dark text-3xl sm:text-4xl md:text-4xl font-bold text-center md:text-left">
            Suggestions
          </h1>

          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-2xl font-heading text-dark font-bold">
              Latest suggestions:
            </h2>
            {latestDesk &&
            latestDesk.suggestions &&
            latestDesk.suggestions.length > 0 ? (
              <div className="mt-4">
                <div className="mt-4 mb-8 flex flex-col items-center md:items-start">
                  <img
                    src={latestDesk.imageUrl}
                    alt="Uploaded preview"
                    className="max-w-2xs sm:max-w-xs md:max-w-md lg:max-w-lg border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg"
                  />
                </div>
                <ul className="font-body list-disc list-inside flex flex-col items-center md:items-start gap-3">
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
                No suggestions available, upload a photo and generate
                suggestions to get started.
              </p>
            )}
          </div>

          <button
            onClick={handleViewOlderSuggestions}
            className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {visibleOlderSuggestions
              ? "Hide older suggestions"
              : "Load older suggestions"}
          </button>

          <div
            className={`flex flex-col items-center md:items-start gap-4 mt-10 ${
              visibleOlderSuggestions ? "block" : "hidden"
            }`}
          >
            <h2 className="font-heading text-dark text-xl font-semibold">
              Previous suggestions:
            </h2>
            {prevDesk &&
            prevDesk.suggestions &&
            prevDesk.suggestions.length > 0 ? (
              <div className="mt-4">
                <div className="mt-4 mb-8 flex flex-col items-center md:items-start">
                  <img
                    src={prevDesk.imageUrl}
                    alt="Uploaded preview"
                    className="max-w-md border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg mb-4"
                  />
                </div>
                <ul className="font-body list-disc list-inside flex flex-col items-center md:items-start gap-3">
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
      </motion.div>
    </div>
  );
};

export default Suggestions;
