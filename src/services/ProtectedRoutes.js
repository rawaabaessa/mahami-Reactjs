import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const auth = localStorage.getItem("loggedin");

  return auth ? <Outlet /> : <Navigate to={"/"} />;
}
