import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";

const apiUrl = "http://localhost:8080";

const Settings = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

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
        setUserEmail(data.user.email);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <h3>Name</h3>
        <p>{userName}</p>
        <h3>Email</h3>
        <p>{userEmail}</p>
        <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
          Change Name
        </button>
        <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
          Change Email
        </button>
        <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
