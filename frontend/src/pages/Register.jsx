// TODO: check if email already exists, if it does give a message and ask them to log in instead

import { useState } from "react";
import { Link } from "react-router-dom";

// change this once on render
const apiUrl = "http://localhost:8080";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

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
    <div>
      <div>
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              placeholder="yourfullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              vbalue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Register;
