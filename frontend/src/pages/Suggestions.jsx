import { useState, useRef, useEffect } from "react";
import SideBar from "../components/SideBar";
import { useDeskStore } from "../state/deskStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const apiUrl = "https://desk-forge.onrender.com";

const Suggestions = () => {
  const { latestDesk, setLatestDesk, clearDesk } = useDeskStore();
  const [olderDesks, setOlderDesks] = useState([]);
  const [message, setMessage] = useState("");
  const [visibleOlderSuggestions, setVisibleOlderSuggestions] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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
          setOlderDesks(data.desks.slice(1));
        } else {
          clearDesk();
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchDesks();
  }, [setLatestDesk, clearDesk]);

  const handleViewOlderSuggestions = () => {
    setVisibleOlderSuggestions(!visibleOlderSuggestions);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const dateFilterOptions = Array.from(
    new Set(
      olderDesks.map((desk) => {
        const date = new Date(desk.createdAt);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      })
    )
  ).sort((a, b) => (a < b ? 1 : -1));

  const filteredOlderDesks = selectedDate
    ? olderDesks.filter((desk) => {
        const date = new Date(desk.createdAt);
        const deskDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        return deskDate === selectedDate;
      })
    : olderDesks;

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-8">
      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SideBar />

        <div
          className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-10 
                  p-4 sm:p-6 md:p-10 w-full md:w-[720px] lg:w-[700px] xl:w-[900px] 
                  mx-auto h-[80vh] overflow-auto overflow-y-auto"
        >
          <h1 className="font-heading text-dark text-3xl sm:text-4xl md:text-4xl font-bold text-center md:text-left">
            Suggestions
          </h1>

          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-2xl font-heading text-dark font-bold">
              Latest suggestions:
            </h2>

            {latestDesk ? (
              <div className="mt-4">
                <h3 className="text-xl font-heading text-dark font-semibold">
                  Latest desk:{" "}
                  <span className="text-base font-normal italic text-gray-600">
                    {formatDate(latestDesk.createdAt)}
                  </span>
                </h3>
                <div className="mt-4 mb-8 flex flex-col items-center md:items-start">
                  <img
                    src={latestDesk.imageUrl}
                    alt="Uploaded preview"
                    className="max-w-2xs sm:max-w-xs md:max-w-md lg:max-w-lg border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg"
                  />
                </div>

                {latestDesk.suggestions?.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <ul className="font-body list-disc list-inside flex flex-col items-center md:items-start gap-3">
                      {latestDesk.suggestions.map((suggestion, index) => (
                        <li key={index}>
                          <strong>{suggestion.title}</strong>:{" "}
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/upload"
                      className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      Regenerate Suggestions
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="font-body text-dark">
                      No suggestions available for this desk yet...
                    </p>
                    <Link
                      to="/upload"
                      className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      Generate Suggestions
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <p className="font-body text-dark">No desk uploaded yet...</p>
            )}
          </div>

          <button
            onClick={handleViewOlderSuggestions}
            className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
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
              Older suggestions:
            </h2>

            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <h4 className="font-body text-dark text-md font-semibold">
                Filter by date:
              </h4>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="font-body border px-2 py-1 rounded"
              >
                <option value="">All</option>
                {dateFilterOptions.map((my) => (
                  <option key={my} value={my}>
                    {new Date(my + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {olderDesks && olderDesks.length > 0 ? (
              filteredOlderDesks.map((desk, deskIndex) => (
                <div key={deskIndex} className="mt-4">
                  <h3 className="text-xl font-heading text-dark font-semibold">
                    Desk from:{" "}
                    <span className="text-base font-normal italic text-gray-600">
                      {formatDate(desk.createdAt)}
                    </span>
                  </h3>
                  <div className="mt-4 mb-8 flex flex-col items-center md:items-start">
                    <img
                      src={desk.imageUrl}
                      alt="Uploaded preview"
                      className="max-w-md border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] rounded-lg mb-4"
                    />
                  </div>
                  <ul className="font-body list-disc list-inside flex flex-col items-center md:items-start gap-3">
                    {desk.suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <strong>{suggestion.title}</strong>:{" "}
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
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
