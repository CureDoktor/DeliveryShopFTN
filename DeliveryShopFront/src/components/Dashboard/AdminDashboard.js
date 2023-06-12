import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "./Admin/AdminTopBar"; // Import the TopBar component
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard d-flex">
      <TopBar />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
