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
    <div className="flex flex-row justify-between items-center p-4 mb-4">
      <div className="flex flex-row items-center gap-4">
        <img src="/DF-logo-simple.png" alt="Logo" className="w-8" />
        <p>Welcome {userName || "..."}!</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Nav;
