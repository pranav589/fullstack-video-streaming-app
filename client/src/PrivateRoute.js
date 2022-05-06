import React from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";

export default function PrivateRoute({ path, element }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
}
