import { useState } from "react";
// also add it to the dashboard home page
import { useDeskStore } from "../store/deskStore";

const LatestDesk = ({ desk }) => {
  const { latestDesk, setLatestDesk, clearDesk } = useDeskStore();
  const [isEditingProblems, setIsEditingProblems] = useState(false);
  const [newProblems, setNewProblems] = useState("");

  return (
    <div>
      {latestDesk ? (
        <>
          <img src={latestDesk.imageUrl} alt="Desk" />
          <p>{latestDesk.problems}</p>
        </>
      ) : (
        <p>No desk uploaded yet</p>
      )}
    </div>
  );
};

export default LatestDesk;
