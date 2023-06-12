import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "./Admin/AdminSideBar";
import TopBar from "./Admin/AdminTopBar"; // Import the TopBar component
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <TopBar />
      <AdminSideBar />
    </div>
  );
}

export default AdminDashboard;
