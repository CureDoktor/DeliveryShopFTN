import AdminDashboard from "../AdminDashboard/adminDashboard";
import CustomerDashboard from "../CustomerDashboard/customerDashboard";
import SellerDashboard from "../SellerDashboard/sellerDashboard";
import { useState, useEffect } from "react";

function Dashboard(props) {
  var content = "";
  if (localStorage.getItem("Dashboard")) {
    if (localStorage.getItem("Dashboard") == 0) {
      content = <CustomerDashboard />;
    } else if (localStorage.getItem("Dashboard") == 1) {
      content = <SellerDashboard />;
    } else if (localStorage.getItem("Dashboard") == 2) {
      content = <AdminDashboard />;
    }
  } else {
    if (props.whichUser == 0) {
      content = <CustomerDashboard />;
    } else if (props.whichUser == 1) {
      content = <SellerDashboard />;
    } else if (props.whichUser == 2) {
      content = <AdminDashboard />;
    } else {
      content = "";
    }
  }
  return <AdminDashboard />;
  //return content;
}

export default Dashboard;
