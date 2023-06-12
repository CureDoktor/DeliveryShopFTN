import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Person, CheckCircle, BagCheck } from "react-bootstrap-icons";
import "./AdminSideBar.css";
import { AuthContext } from "../../AuthContext";

function AdminSideBar() {
  const navigate = useNavigate();
  const { removeToken } = useContext(AuthContext); // Destructure removeToken from AuthContext

  return (
    <div className=" col-md-4 navlink">
      <div>
        <div className="tab">
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
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
