import { Link } from "react-router-dom";
//Link doesn't refresh the page, only routes to a page
//It does client side routing
import styles from "./style.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.page404}>
      <div className={styles.container404}>
        <h1>404 not found!</h1>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
}
