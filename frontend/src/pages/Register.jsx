// TODO: check if email already exists, if it does give a message and ask them to log in instead

import { useState } from "react";
import { Link } from "react-router-dom";

// change this once on render
const apiUrl = "http://localhost:8080";

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
    <div className="flex flex-col items-center justify-center min-h-screen gap-15">
      <h2 className="font-mono text-5xl">Register</h2>
      <form
        className="border-4 border-cyan-600 rounded px-20 pb-12 pt-4"
        onSubmit={handleRegister}
      >
        <div className="h-6 mb-2 w-full max-w-xs overflow-hidden">
          <p
            className={`text-sm text-red-600 transition-opacity duration-300 ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            {error || "placeholder"}
          </p>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-sans" htmlFor="name">
            Full name
          </label>
          <input
            type="text"
            id="name"
            placeholder="yourfullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-1 border-1 rounded-[5px]"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-sans" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 border-1 rounded-[5px]"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-sans" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 border-1 rounded-[5px]"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-sans" htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-2 py-1 border-1 rounded-[5px]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 text-white text-lg border-black border-2 rounded cursor-pointer hover:bg-cyan-700 font-mono transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-lg font-sans">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Log in
        </Link>
      </p>
      <Link
        to="/"
        className="mt-4 text-lg font-sans text-cyan-600 font-bold hover:underline duration:200 transition-all"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default Register;
