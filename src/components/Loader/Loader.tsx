import styles from "./style.module.css";
import { useEffect, useState } from "react";

function Loader() {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 1500);
    return () => clearTimeout(timer);
  });

  return (
    showSpinner && (
      <div className={styles.loaderPrompt}>
        <div className={styles.loaderModal}>
          <div className={styles.loader}></div>
        </div>
        <h3>Učitavanje podataka...</h3>
        <p>
          Pri prvoj upotrebi treba više vremena jer stranica koristi besplatni
          Render.com servis
        </p>
      </div>
    )
  );
}

export default Loader;
