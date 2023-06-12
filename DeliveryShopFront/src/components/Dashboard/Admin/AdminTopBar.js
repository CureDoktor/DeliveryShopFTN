import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Person, CheckCircle, BagCheck, DoorOpen } from "react-bootstrap-icons";
import "../Admin/AdminTopBar.css";
import { AuthContext } from "../../AuthContext";

function TopBar() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); // Destructure removeToken from AuthContext

  const handleLogout = () => {
    // Remove the token from local storage and AuthContext
    removeToken();
    console.log("Token removed"); // Debug line
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="top-barv2">
      <div className="">
        {/* <div className="tab">
          <Link to="/admin-dashboard/profile" className="tab-link">
            <Person className="tab-icon" />
            <span className="tab-text">Profil</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/admin-dashboard/verifications" className="tab-link">
            <CheckCircle className="tab-icon" />
            <span className="tab-text">Verifikacije</span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/admin-dashboard/orders" className="tab-link">
            <BagCheck className="tab-icon" />
            <span className="tab-text">Sve porudžbine</span>
          </Link>
        </div> */}
        <div className="logout-tab ms-auto col-md-3">
          <div className="tab mx-auto" onClick={handleLogout}>
            <DoorOpen className="tab-icon" title="Logout" />
            <span className="tab-text">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
