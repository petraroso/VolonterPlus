import { NavLink } from "react-router-dom";
//NavLink is Link that knows if it's active or not

export default function Header() {
  return (
    <header>
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
    </header>
  );
}
