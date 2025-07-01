import SideBar from "../components/SideBar";

const Settings = () => {
  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        {/* Settings content goes here */}
      </div>
    </div>
  );
};

export default Settings;
