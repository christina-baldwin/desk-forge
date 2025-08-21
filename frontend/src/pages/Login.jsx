// TODO: check if an email doesnt exist as an account, id not, give a message that the accoutn doesnt exist and to register

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = "https://desk-forge.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
    }

    setIsLoading(true);

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
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-4 sm:p-6 md:p-8 lg:p-12 bg-primary">
      <h1 className="font-logo text-light text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl drop-shadow-[3px_3px_0_#000000] my-4 sm:my-0 text-center">
        DeskForge
      </h1>

      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 bg-light border-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-8 pb-0 sm:p-8 sm:pb-0 md:p-12 md:pb-0 lg:p-16 lg:pb-0 xl:p-20 xl:pb-0">
        <h2 className="font-heading text-dark text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
          Log in
        </h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="h-6">
            <p
              className={`text-sm text-red-600 transition-opacity duration-300 ${
                error ? "opacity-100" : "opacity-0"
              }`}
            >
              {error || "placeholder"}
            </p>
          </div>

          <div className="flex flex-col gap-2">
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
              onChange={(e) => setEmail(e.target.value)}
              className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
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
              onChange={(e) => setPassword(e.target.value)}
              className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-4 bg-accent text-dark text-lg sm:text-lg md:text-xl lg:text-xl rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent w-full"
          >
            LOGIN
          </button>
        </form>

        <p className="font-body text-dark mt-4 text-sm sm:text-base md:text-lg italic text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Register here
          </Link>
        </p>

        <Link
          to="/"
          className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-heading text-dark font-bold hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent text-center"
        >
          ← Back to Home
        </Link>

        <p
          className={`font-heading text-dark italic text-center bg-slate-100 p-4 border border-accent rounded-md transition-opacity duration-300 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          Logging in...
        </p>
      </div>
    </div>
  );
};

export default Login;
