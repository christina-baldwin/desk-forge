import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-50">
      <img src="/DF-logo.png" alt="Logo" className="mb-10 w-100" />
      <h1 className="font-mono text-6xl font-bold mb-8">
        Welcome to DeskForge!
      </h1>
      <p className="font-sans text-center text-xl/10 p-8 mb-12">
        The app designed for tabletop gamers and hobbyists to effortlessly
        organise their desk spaces. Whether you're managing your Warhammer
        armies or juggling multiple creative projects, Desk Forge helps you stay
        focused and inspired. Upload photos, add notes, get AI-powered
        suggestions, and spend more time doing what you love instead of
        stressing about organisation!
      </p>
      <p className="text-2xl font-bold font-sans">Try it! &darr;</p>
      <div className="flex gap-8">
        <Link to="/login">
          <button className="px-4 py-2 bg-cyan-600 text-white text-lg border-black border-2 rounded cursor-pointer hover:bg-cyan-700 font-mono transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 bg-white text-black text-lg border-black border-2 rounded hover:bg-gray-100 font-sans cursor-pointer transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
