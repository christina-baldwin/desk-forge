import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gap-8 p-6 sm:p-8 md:p-12 lg:px-16 xl:px-24 bg-primary text-dark">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 w-full justify-center">
        <Link to="/login">
          <button className="px-4 py-2 sm:px-5 sm:py-3 md:px-5 md:py-3 lg:px-5 lg:py-3 bg-light text-dark text-lg sm:text-lg md:text-lg lg:text-xl rounded cursor-pointer font-heading border-accent border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent">
            LOGIN
          </button>
        </Link>

        <h1 className="font-logo text-light text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl drop-shadow-[3px_3px_0_#000000] my-4 sm:my-0 text-center sm:text-left">
          DeskForge
        </h1>

        <Link to="/register">
          <button className="px-4 py-2 sm:px-5 sm:py-3 md:px-5 md:py-3 lg:px-5 lg:py-3 bg-accent text-dark text-lg sm:text-lg md:text-lg lg:text-xl rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent">
            REGISTER
          </button>
        </Link>
      </div>

      <div
        className="flex flex-col items-center bg-light pt-6 pr-6 pl-6 pb-0 
                sm:pt-8 sm:pr-8 sm:pl-8 sm:pb-0 
                md:pt-12 md:pr-12 md:pl-12 md:pb-0 
                lg:pt-16 lg:pr-16 lg:pl-16 lg:pb-0 
                xl:pt-20 xl:pr-20 xl:pl-20 xl:pb-0 
                border-4 rounded-lg shadow-lg w-full 
                max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-6xl xl:max-w-7xl sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12"
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl mb-4 sm:mb-6 text-dark text-center">
          Smarter Desks. Smarter Hobbies.
        </h2>

        <p className="font-body text-center text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl mb-4 sm:mb-6 md:mb-8 lag:mb-10 xl:mb-14">
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
          className="w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default Landing;
