const Nav = () => {
  return (
    <div className="flex flex-row justify-between items-center p-4 mb-4">
      <div className="flex flex-row items-center gap-4">
        <img src="/DF-logo-simple.png" alt="Logo" className="w-8" />
        <p>Welcome User Name!</p>
      </div>
      <button className="px-3 py-2 border-2 rounded-[5px] cursor-pointer">
        Logout
      </button>
    </div>
  );
};

export default Nav;
