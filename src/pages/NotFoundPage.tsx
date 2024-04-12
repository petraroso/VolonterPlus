import { Link } from "react-router-dom"; 
//Link doesn't refresh the page, only routes to a page
//It does client side routing

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 not found!</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
