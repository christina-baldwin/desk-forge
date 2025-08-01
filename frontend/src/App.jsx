import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Suggestions from "./pages/Suggestions";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Settings from "./pages/Settings";

export const App = () => {
  return (
    <div className="bg-teal-900 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
