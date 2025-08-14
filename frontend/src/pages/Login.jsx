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

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-15">
      <h1 className="font-logo text-light text-4xl drop-shadow-[3px_3px_0_#000000]">
        DeskForge
      </h1>
      <div className="flex flex-col items-center justify-center gap-8 bg-light pt-30 pb-30 pl-60 pr-60 border-10 rounded-lg shadow-lg w-200 h-220">
        <h2 className="font-heading text-dark text-5xl">Log in</h2>
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
            <label className="font-heading" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="font-body px-2 py-1 border-1 rounded-[5px]"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-heading" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="font-body px-2 py-1 border-1 rounded-[5px]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-dark text-lg rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
          >
            LOGIN
          </button>
        </form>

        <p className="font-body text-dark mt-4 text-lg italic">
          Don’t have an account?{" "}
          <Link to="/register" className="underline">
            Register here
          </Link>
        </p>
        <Link
          to="/"
          className="mt-4 text-lg font-heading text-dark font-bold hover:underline duration:200 transition-all"
        >
          ← Back to Home
        </Link>
        <div className="h-6 mb-2 w-full max-w-xs overflow-hidden">
          {isLoading && (
            <p
              className={`font-heading text-dark text-sm text-center italic transition-opacity duration-300 ${
                isLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              Logging in...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
