import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <section id="home">
      <div>
        <h1>Welcome!</h1>
      </div>
      <div>
        <button onClick={() => navigate("/admin")}>Go to Dashboard</button>
      </div>
    </section>
  );
};
