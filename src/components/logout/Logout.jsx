import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("DPMAccessToken");
    localStorage.removeItem("DPMRefreshToken");
    window.location.assign("/login");
  }, []);

  return null;
};

export default Logout;
