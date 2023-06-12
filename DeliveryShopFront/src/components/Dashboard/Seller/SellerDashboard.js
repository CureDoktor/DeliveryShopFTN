import React from "react";
import { Text } from "@fluentui/react";
import SellerTopBar from "./SellerTopBar";
import SellerSideBar from "./SellerSideBar";
import TopBar from "../Admin/AdminTopBar";
import { Row, Col, Container } from "react-bootstrap";

const SellerDashboard = () => {
  return (
    <div className="container">
      <TopBar />
      <SellerSideBar />
      
      {/* Add seller-specific content */}
    </div>
  );
};

export default SellerDashboard;
