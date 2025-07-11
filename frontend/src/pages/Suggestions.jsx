import SideBar from "../components/SideBar";

const Suggestions = () => {
  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Suggestions</h1>
        {/* Suggestions content goes here */}
      </div>
    </div>
  );
};

export default Suggestions;
