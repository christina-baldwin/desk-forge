import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gap-10 p-30 bg-primary text-dark">
      <div className="flex gap-30 mb-10">
        <Link to="/login">
          <button className="px-4 py-2 bg-light text-dark text-lg rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200">
            LOGIN
          </button>
        </Link>
        <div className="flex items-center justify-center">
          <h1 className="font-logo text-light text-4xl drop-shadow-[3px_3px_0_#000000]">
            DeskForge
          </h1>
        </div>
        <Link to="/register">
          <button className="px-4 py-2 bg-accent text-dark text-lg rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200">
            REGISTER
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center bg-light pt-30 pl-50 pr-50 border-10 rounded-lg shadow-lg">
        <h2 className="font-heading text-6xl mb-15 text-dark text-center">
          Smarter Desks. Smarter Hobbies.
        </h2>
        <p className="font-body text-center text-xl/10 p-8 mb-12">
          AI-powered feedback to optimise your hobby desk setup. Engineered for
          building and painting. Elevate your crafting station with tailored
          insights designed to enhance precision, comfort, and creativity for
          every step of your creative journey.
        </p>
        <img
          src="/hero-img-crop.png"
          alt="Screenshot of app dashboard"
          className="w-70"
        />
      </div>
    </div>
  );
};

export default Landing;
