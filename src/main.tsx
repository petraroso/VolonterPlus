import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AdminContext } from "./AdminContext";

import ActivitiesPage from "./pages/ActivitiesPage/ActivitiesPage";
import AssociationsPage from "./pages/AssociationsPage/AssociationsPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import VolunteersPage from "./pages/VolunteersPage/VolunteersPage";

import Layout from "./components/Layout";

import "./modern-normalize.css";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
      <Route index element={<HomePage />} />
      <Route path="activities" element={<ActivitiesPage />} />
      <Route path="associations" element={<AssociationsPage />} />
      <Route path="volunteers" element={<VolunteersPage />} />
    </Route>
  )
);

const App = () => {
  const [admin, setAdmin] = useState(false);
  const initialAdminState = {
    admin: admin,
    setAdmin: setAdmin,
  };

  return (
    <React.StrictMode>
      <AdminContext.Provider value={initialAdminState}>
        <RouterProvider router={router} />
      </AdminContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
