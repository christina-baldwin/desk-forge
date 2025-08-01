import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8080";

const Nav = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${apiUrl}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user name");
        }

        setUserName(data.user.name);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-row justify-between items-center p-4 mb-4 ">
      <div className="flex flex-row items-center gap-8">
        <p className="font-logo text-light text-4xl drop-shadow-[3px_3px_0_#000000]">
          DF
        </p>
        <p className="font-heading text-light text-xl drop-shadow-[3px_3px_0_#000000]">
          Hi, {userName || "..."}!
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Nav;
