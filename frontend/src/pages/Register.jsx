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

      if (!response.ok) {
        throw new Error("Registration failed");
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-15 p-50">
      <h2 className="text-5xl">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name">Full name</label>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            vbalue={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 border-1 rounded-[5px]"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confirm-password">Confirm password</label>
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
          className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
        >
          Register
        </button>
        {error && <p>{error}</p>}
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Log in
        </Link>
      </p>
      <Link to="/" className="hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default Register;
