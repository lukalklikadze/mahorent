import { useState } from "react";
import AdminLogin from "./adminLogin";
import AdminPanel from "../pages/adminPanel";

const AdminWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminPanel onLogout={handleLogout} />
      )}
    </>
  );
};

export default AdminWrapper;
