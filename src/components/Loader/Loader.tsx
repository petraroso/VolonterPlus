import "./Loader.css";
import { useEffect, useState } from "react";

function Loader() {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 1500);
    return () => clearTimeout(timer);
  });

  return (
    showSpinner && (
      <div className="loader-prompt">
        <div className="loader-modal">
          <div className="loader"></div>
        </div>
        <h3>Učitavanje podataka...</h3>
        <p>Stranica koristi besplatni Render.com servis</p>
      </div>
    )
  );
}

export default Loader;
