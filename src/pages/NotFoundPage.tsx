import { Link } from "react-router-dom";
//Link doesn't refresh the page, only routes to a page
//It does client side routing

export default function NotFoundPage() {
  return (
    <div className="page-404">
      <div className="container-404">
        <h1>404 not found!</h1>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
}
