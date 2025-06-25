// TODO: check if an email doesnt exist as an account, id not, give a message that the accoutn doesnt exist and to register

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// change this once on render
const apiUrl = "http://localhost:8080";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      navigate("/app");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-15">
      <h2 className="text-5xl">Log in</h2>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
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
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 border-1 rounded-[5px]"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 border-2 rounded-[5px] cursor-pointer"
        >
          Log In
        </button>
      </form>

      <p>
        Don’t have an account?{" "}
        <Link to="/register" className="underline">
          Register here
        </Link>
      </p>
      <Link to="/" className="hover:underline">
        ← Back to Home
      </Link>
      <div className="h-6 mb-2 w-full max-w-xs overflow-hidden">
        {isLoading && (
          <p
            className={`text-sm text-center italic transition-opacity duration-300 ${
              isLoading ? "opacity-100" : "opacity-0"
            }`}
          >
            Logging in...
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
