// TODO: check if email already exists, if it does give a message and ask them to log in instead

import { useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "https://desk-forge.onrender.com";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!name || name.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-4 sm:p-6 md:p-8 lg:p-12 bg-primary">
      <h1 className="font-logo text-light text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl drop-shadow-[3px_3px_0_#000000] my-4 sm:my-0 text-center">
        DeskForge
      </h1>

      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 bg-light border-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-8 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        <h2 className="font-heading text-dark text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
          Register
        </h2>
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          <div className="h-6">
            <p
              className={`text-sm text-red-600 transition-opacity duration-300 ${
                error ? "opacity-100" : "opacity-0"
              }`}
            >
              {error || "placeholder"}
            </p>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label
              className="font-heading text-sm sm:text-base md:text-lg"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              type="text"
              id="name"
              placeholder="yourfullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label
              className="font-heading text-sm sm:text-base md:text-lg"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label
              className="font-heading text-sm sm:text-base md:text-lg"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label
              className="font-heading text-sm sm:text-base md:text-lg"
              htmlFor="confirm-password"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-4 bg-accent text-dark text-lg sm:text-lg md:text-xl lg:text-xl rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent w-full"
          >
            REGISTER
          </button>
        </form>

        <p className="font-body text-dark mt-4 text-lg italic">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Log in
          </Link>
        </p>
        <Link
          to="/"
          className="mt-4 text-lg font-heading text-dark font-bold hover:underline duration:200 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;
