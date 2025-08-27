import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const apiUrl = "https://desk-forge.onrender.com";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();
    const trimmedConfirmPassword = formData.confirmPassword.trim();

    if (
      !trimmedName ||
      trimmedName.length < 3 ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      setErrors(() => ({
        name:
          !trimmedName || trimmedName.length < 3
            ? "Name must be at least 3 characters"
            : "",
        email: !trimmedEmail ? "Email is required" : "",
        password: !trimmedPassword ? "Password is required" : "",
        confirmPassword: !trimmedConfirmPassword
          ? "Confirm Password is required"
          : "",
      }));
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!trimmedEmail) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required.",
      }));
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    if (!trimmedPassword) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
      return;
    }

    if (!trimmedConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required.",
      }));
      return;
    }

    if (trimmedPassword.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    if (trimmedConfirmPassword.length < 6) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm password must be at least 6 characters long.",
      }));
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
      setError("");
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

      <motion.div
        className="flex flex-col md:flex-row gap-4 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 bg-light border-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-8 pb-0 sm:p-8 sm:pb-0 md:p-12 md:pb-0 lg:p-16 lg:pb-0 xl:p-20 xl:pb-0 h-[80vh] overflow-auto overflow-y-auto">
          <h2 className="font-heading text-dark text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
            Register
          </h2>
          <form onSubmit={handleRegister} className="w-full flex flex-col">
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
                htmlFor="name"
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="yourfullname"
                value={formData.name}
                onChange={handleChange}
                className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              <p
                className="text-red-600 text-sm mt-1 h-5"
                style={{ visibility: errors.name ? "visible" : "hidden" }}
              >
                {errors.name || "placeholder"}
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
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              <p
                className="text-red-600 text-sm mt-1 h-5"
                style={{ visibility: errors.email ? "visible" : "hidden" }}
              >
                {errors.email || "placeholder"}
              </p>
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
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              <p
                className="text-red-600 text-sm mt-1 h-5"
                style={{ visibility: errors.password ? "visible" : "hidden" }}
              >
                {errors.password || "placeholder"}
              </p>
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
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="font-body px-2 py-1 sm:px-3 sm:py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              <p
                className="text-red-600 text-sm mt-1 h-5"
                style={{
                  visibility: errors.confirmPassword ? "visible" : "hidden",
                }}
              >
                {errors.confirmPassword || "placeholder"}
              </p>
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

          <p
            className={`font-heading text-dark italic text-center bg-slate-100 p-4 border border-accent rounded-md transition-opacity duration-300 ${
              isLoading ? "opacity-100" : "opacity-0"
            }`}
          >
            Registering account...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
