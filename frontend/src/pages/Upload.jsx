import { useState } from "react";
import SideBar from "../components/SideBar";
import UploadDesk from "../components/UploadDesk";
import LatestDesk from "../components/LatestDesk";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Upload = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupVisibility = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8">
      <motion.div
        className="flex flex-col md:flex-row gap-4 p-4 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SideBar />

        <div
          className="bg-light border-6 rounded-lg shadow-lg flex flex-col gap-8 
                  p-4 sm:p-6 md:p-10 w-full md:w-[720px] lg:w-[900px] 
                  mx-auto md:mx-0 overflow-auto"
        >
          <h1 className="font-heading text-dark text-3xl sm:text-4xl md:text-4xl font-bold text-center md:text-left">
            Analyse Desk Setup
          </h1>
          <button
            onClick={handlePopupVisibility}
            className="flex items-center gap-2 text-left italic text-dark underline cursor-pointer mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <LightBulbIcon className="h-5 w-5 text-dark focus:outline-none focus:ring-2 focus:ring-accent" />
            Need help? Click here
          </button>
          <div
            className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 ${
              popupVisible ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-6 bg-light rounded-lg p-20 max-w-2xl border-accent border-4 shadow-[0_0_0_4px_black]">
              <h2 className="text-2xl font-heading text-dark font-bold">
                Tips & Requirements
              </h2>
              <ul className="flex flex-col gap-2 font-body list-disc pl-5 italic">
                <li>
                  You can upload a new desk photo OR you can use an existing
                  desk you have uploaded before, this is displayed below
                </li>
                <li>When taking a photo:</li>
                <ul className="flex flex-col gap-2 font-body list-decimal pl-5 italic">
                  <li>Ensure good lighting</li>
                  <li>Avoid cluttered backgrounds</li>
                  <li>Fit the whole desk in frame</li>
                </ul>
                <li>When uploading:</li>
                <ul className="flex flex-col gap-2 font-body list-decimal pl-5 italic">
                  <li>
                    Make sure to only upload accepted image formats: JPG, PNG,
                    GIF
                  </li>
                  <li>Stay within the max file size of 5MB</li>
                  <li>Write a clear description of the problem</li>
                </ul>
                <li>When generating from an existing desk:</li>
                <ul className="flex flex-col gap-2 font-body list-decimal pl-5 italic">
                  <li>
                    Once a desk has been uploaded it gets saved in the latest
                    desk section
                  </li>
                  <li>
                    You can then generate suggestions, regenerate suggestions,
                    add new problems, or delete the desk
                  </li>
                </ul>
              </ul>
              <button
                onClick={handlePopupVisibility}
                className="px-4 py-2 bg-accent text-dark text-md rounded font-heading cursor-pointer border-light border-4 shadow-[0_0_0_4px_black] drop-shadow-[3px_3px_0_#1b2a2f] transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Close
              </button>
            </div>
          </div>

          <UploadDesk />

          <LatestDesk />
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
