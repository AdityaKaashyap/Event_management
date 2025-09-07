import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove tokens from localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return null; // nothing to render
}
