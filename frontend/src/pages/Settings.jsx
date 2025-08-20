import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";

const apiUrl = "https://desk-forge.onrender.com";

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
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8">
      <SideBar />

      <div
        className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-8 
                  p-4 sm:p-6 md:p-10 w-full md:w-[720px] lg:w-[900px] 
                  mx-auto md:mx-0 overflow-auto"
      >
        <h1 className="font-heading text-dark text-4xl font-bold mb-4">
          Settings
        </h1>

        <h3 className="font-heading text-dark text-2xl font-semibold">Name</h3>
        {isEditingName ? (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-body text-dark">New Name</label>
              <div>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-4 py-2 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleNameSave}
                className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingName(false)}
                className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <p className="font-body text-lg mb-4">{userName}</p>
            <button
              onClick={() => setIsEditingName(true)}
              className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Change Name
            </button>
          </div>
        )}

        <h3 className="font-heading text-dark text-2xl font-semibold">Email</h3>
        {isEditingEmail ? (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-body text-dark">New Email</label>
              <div>
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="px-4 py-2 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <button
                onClick={handleEmailSave}
                className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingEmail(false)}
                className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <p className="font-body text-lg mb-2">{userEmail}</p>
            <button
              onClick={() => setIsEditingEmail(true)}
              className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Change Email
            </button>
          </div>
        )}

        <h3 className="font-heading text-dark text-2xl font-semibold">
          Password
        </h3>
        {isEditingPassword ? (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-body text-dark">New Password</label>
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-4 py-2 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-body text-dark">
                Confirm New Password
              </label>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-4 py-2 border-2 text-dark font-body rounded-[5px] mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePasswordSave}
                className="px-4 py-2 bg-light text-dark text-md rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingPassword(false)}
                className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <p className="font-body text-lg mb-2">********</p>
            <button
              onClick={() => setIsEditingPassword(true)}
              className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
