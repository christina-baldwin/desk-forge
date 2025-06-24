import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>DeskForge</h1>
      <p>
        Welcome to Desk Forge! The app designed for tabletop gamers and
        hobbyists to effortlessly organise their desk spaces. Whether you're
        managing your Warhammer armies or juggling multiple creative projects,
        Desk Forge helps you stay focused and inspired. Upload photos, add
        notes, get AI-powered suggestions, and spend more time doing what you
        love instead of stressing about organisation!
      </p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
