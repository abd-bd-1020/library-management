import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleNavigateToHomePage = () => {
    navigate("/homePage");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Error 404</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        style={{
          color: "blue",
          textDecoration: "underline",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onClick={handleNavigateToHomePage}
      >
        Go Back to Home Page
      </button>
    </div>
  );
}

export default ErrorPage;
