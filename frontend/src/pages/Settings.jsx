import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";

const apiUrl = "http://localhost:8080";

const Settings = () => {
  const [userName, setUserName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);

  const [userEmail, setUserEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleNameSave = async () => {
    const token = localStorage.getItem("token");

    //TODO: need a patch route on the backend
    try {
      const response = await fetch(`${apiUrl}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user name");
      }

      setUserName(newName);
      setIsEditingName(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <h3>Name</h3>
        {isEditingName ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-2 py-1 border-1 rounded-[5px]"
            />
            <button
              onClick={handleNameSave}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p>{userName}</p>
            <button
              onClick={() => setIsEditingName(true)}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Change Name
            </button>
          </>
        )}

        <h3>Email</h3>
        <p>{userEmail}</p>

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
