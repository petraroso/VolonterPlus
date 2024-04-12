import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ActivitiesPage from "./pages/ActivitiesPage";
import AssociationsPage from "./pages/AssociationsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import VolunteersPage from "./pages/VolunteersPage";

import Layout from "./components/Layout";

import "./index.css";
import "./App.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={ <NotFoundPage/>}
    >
      <Route path="" element={<HomePage />} />
      <Route path="activities" element={<ActivitiesPage />} />
      <Route path="associations" element={<AssociationsPage />} />
      <Route path="volunteers" element={<VolunteersPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
