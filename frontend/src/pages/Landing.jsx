import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gap-10 p-30 bg-teal-900">
      <div className="flex gap-30 mb-10">
        <Link to="/login">
          <button className="px-4 py-2 bg-[#4fb2ad] text-black text-lg border-black border-3 rounded cursor-pointer font-mono drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200">
            Login
          </button>
        </Link>
        <div className="flex items-center justify-center">
          <h1
            className="text-slate-100 text-4xl drop-shadow-[3px_3px_0_#000000]"
            style={{ fontFamily: "'Bungee', cursive" }}
          >
            DeskForge
          </h1>
        </div>
        <Link to="/register">
          <button className="px-4 py-2 bg-slate-100 text-black text-lg border-black border-3 rounded font-sans cursor-pointer drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200">
            Register
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center bg-slate-100 p-60 border-10 rounded-lg shadow-lg">
        <h2 className="font-mono text-6xl mb-15 text-textDark text-center">
          Smarter Desks. <br /> Smarter Hobbies.
        </h2>
        <p className="font-sans text-center text-xl/10 p-8 mb-12">
          AI-powered feedback to improve your hobby desk setup. Tailored for
          miniature painting, gaming, and more.
        </p>
      </div>
    </div>
  );
};

export default Landing;
