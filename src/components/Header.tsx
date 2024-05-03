import { NavLink } from "react-router-dom";
//NavLink is Link that knows if it's active or not
import logo from "../assets/logo-no-bg.png";
import { useState } from "react";
import { useAdminContext } from "../AdminContext";

export default function Header() {
  const adminData = useAdminContext();
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
    adminData.setAdmin((prev) => !prev);
  };

  return (
    <header className="header">
      <NavLink to="/" className="nav-logo">
        <img src={logo} className="logo" alt={"logo"} />
      </NavLink>

      <input type="checkbox" id="check" />

      <label htmlFor="check" className="icons">
        <i className="bx bx-menu" id="menu-icon"></i>
        <i className="bx bx-x" id="close-icon"></i>
      </label>

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
          <span>Admin:</span>
          <button
            className={`toggle-btn ${toggled ? "toggled" : ""}`}
            onClick={handleToggle}
          >
            <div className="thumb"></div>
          </button>
        </div>
      </nav>
    </header>
  );
}
