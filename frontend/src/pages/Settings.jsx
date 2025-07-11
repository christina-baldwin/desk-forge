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
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user email");
      }

      setUserEmail(newEmail);
      setIsEditingEmail(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordSave = async () => {
    const token = localStorage.getItem("token");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user password");
      }

      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <h3 className="text-lg font-bold">Name</h3>
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

        <h3 className="text-lg font-bold">Email</h3>
        {isEditingEmail ? (
          <>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="px-2 py-1 border-1 rounded-[5px]"
            />
            <button
              onClick={handleEmailSave}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingEmail(false)}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p>{userEmail}</p>
            <button
              onClick={() => setIsEditingEmail(true)}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Change Email
            </button>
          </>
        )}

        <h3 className="text-lg font-bold">Password</h3>
        {isEditingPassword ? (
          <>
            <div className="flex flex-col gap-2 ">
              <label>New Password</label>
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-2 py-1 border-1 rounded-[5px] "
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <label>Confirm New Password</label>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-2 py-1 border-1 rounded-[5px]"
                />
              </div>
            </div>
            <button
              onClick={handlePasswordSave}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingPassword(false)}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p>********</p>
            <button
              onClick={() => setIsEditingPassword(true)}
              className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
            >
              Change Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
