import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="navTitle">
        <Link to="/admin">Dashboard</Link>
      </div>
      <div className="navName">Rodrigo López</div>
    </nav>
  );
};
