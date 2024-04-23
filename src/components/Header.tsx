import { NavLink } from "react-router-dom";
//NavLink is Link that knows if it's active or not
import logo from "../assets/logo-no-bg.png";
import { useState } from "react";

export default function Header() {
  const [toggled, setToggled] = useState(false);
  return (
    <header className="header">
      <NavLink to="/" className="nav-logo">
        <img src={logo} className="logo" alt={"logo"} />
      </NavLink>

      <div className="icons">
        <i className="bx bx-menu" id="menu-icon"></i>
        <i className="bx bx-x" id="close-icon"></i>
      </div>

      <nav className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "nav-link-active" : "";
          }}
        >
          Početna
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) => {
            return isActive ? "nav-link-active" : "";
          }}
        >
          Aktivnosti
        </NavLink>
        <NavLink
          to="/volunteers"
          className={({ isActive }) => {
            return isActive ? "nav-link-active" : "";
          }}
        >
          Volonteri
        </NavLink>
        <NavLink
          to="/associations"
          className={({ isActive }) => {
            return isActive ? "nav-link-active" : "";
          }}
        >
          Udruge
        </NavLink>
        <div className="admin-toggle">
          <span>Admin</span>
          <button
            className={`toggle-btn ${toggled ? "toggled" : ""}`}
            onClick={() => setToggled(!toggled)}
          >
            <div className="thumb"></div>
          </button>
        </div>
      </nav>
    </header>
  );
}
