import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-20 p-50">
      <img src="/DF-logo.png" alt="Logo" className="w-150" />
      <p className="text-center text-lg/8">
        Welcome to Desk Forge! The app designed for tabletop gamers and
        hobbyists to effortlessly organise their desk spaces. Whether you're
        managing your Warhammer armies or juggling multiple creative projects,
        Desk Forge helps you stay focused and inspired. Upload photos, add
        notes, get AI-powered suggestions, and spend more time doing what you
        love instead of stressing about organisation!
      </p>
      <div className="flex gap-8">
        <Link to="/login">
          <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
