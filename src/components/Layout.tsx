import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </>
  );
}
