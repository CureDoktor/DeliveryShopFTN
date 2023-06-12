import React from "react";
import { Text } from "@fluentui/react";
import SellerTopBar from "./SellerTopBar";
import SellerSideBar from "./SellerSideBar";
import TopBar from "../Admin/AdminTopBar";
import { Row, Col, Container } from "react-bootstrap";
import Map from "../../Map";
import { useState } from "react";

const SellerDashboard = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      latitude: 41.1234,
      longitude: 20.5678,
    },
    {
      id: 2,
      latitude: 42.5678,
      longitude: 21.1234,
    },
  ]);
  const handlePackageClick = (packageId) => {
    // Implementirajte logiku za prihvatanje paketa na osnovu ID-a
    console.log(`Prihvaćen paket sa ID-jem: ${packageId}`);
  };

  return (
    <div className="container">
      <TopBar />
      <SellerSideBar />
      <Map packages={packages} handlePackageClick={handlePackageClick} />
      {/* Add seller-specific content */}
    </div>
  );
};

export default SellerDashboard;
