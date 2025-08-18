import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gap-10 p-30 bg-primary text-dark">
      <div className="flex gap-30 mb-10">
        <Link to="/login">
          <button className="px-4 py-2 bg-light text-dark text-lg rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent">
            LOGIN
          </button>
        </Link>
        <div className="flex items-center justify-center">
          <h1 className="font-logo text-light text-4xl drop-shadow-[3px_3px_0_#000000]">
            DeskForge
          </h1>
        </div>
        <Link to="/register">
          <button className="px-4 py-2 bg-accent text-dark text-lg rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent">
            REGISTER
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center bg-light pt-30 pl-50 pr-50 border-10 rounded-lg shadow-lg">
        <h2 className="font-heading text-6xl mb-15 text-dark text-center">
          Smarter Desks. Smarter Hobbies.
        </h2>
        <p className="font-body text-center text-xl/10 p-8 mb-12">
          Do you get frustrated whenever you sit down to build or paint your
          miniatures? Do you wish your hobby desk worked better for you?
          DeskForge can help with that! Providing you with AI-powered feedback
          to help you optimise your hobby space! All you have to do is upload a
          photo of your current desk space and we give you tailored insights
          designed to enhance your creative journey. Just make an account and
          give it a go!
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
