import React, { useEffect, useState, useContext } from "react";
import { Pen } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../AuthContext";
import SellerTopBar from "./SellerTopBar";
import "./SellerProfile.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SellerSideBar from "./SellerSideBar";
import { Row, Col, Container } from "react-bootstrap";
import {
  Clock16Filled,
  CheckboxChecked16Filled,
  BugFilled,
} from "@fluentui/react-icons";
import { Users, usersUpdate } from "../../../hooks/ApiService";
import TopBar from "../Admin/AdminTopBar";

function Profile() {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Users(token);
        const data = await response.json();
        if (response.ok) {
          setUserData(data.user);
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setUserName(data.user.userName);
          setEmail(data.user.email);
          setDate(data.user.date.split("T")[0]);
          setAddress(data.user.address);
          setImgPath(data.user.imgPath);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const { id, role, status, ...userProfile } = userData || {};

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform file upload logic
  };

  const handleSubmit = async () => {
    console.log(address);
    const formData = {
      id,
      firstName,
      lastName,
      userName,
      date: new Date(date).toISOString(), // Convert the date to ISO format for sending to the backend
      role,
      address,
      imgPath,
      email,
      password: "",
      confirmPassword: "",
      status,
    };

    try {
      const response = await usersUpdate(token, formData);

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully:", data);
        setUserData(formData); // update local userData state with the new data
        setIsEditMode(false); // exit edit mode
      } else if (response.status === 400) {
        setIsDialogVisible(true); // show the dialog
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <TopBar />
      <Row>
        <Col sm={3}>
          <SellerSideBar />
        </Col>
        <Col sm={9}>
          <div className="card documentcardtitle">
            {userProfile ? (
              <div className="">
                <div className="card-header">
                  <h3 className="card-title"> Korisnički profil</h3>
                  <div className="ms-3 cursor-pointer">
                    <Pen
                      onClick={handleEditClick}
                      className={` ${isEditMode ? "active" : ""}`}
                    />
                  </div>
                </div>
                <div className="card-content">
                  {isEditMode ? (
                    <Form.Group className="stack-card" style={{ gap: "10px" }}>
                      <div>
                        <div className="gray-text">Ime:</div>
                        <Form.Control
                          type="text"
                          defaultValue={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Prezime:</div>
                        <Form.Control
                          type="text"
                          defaultValue={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Korisničko ime:</div>
                        <Form.Control
                          type="text"
                          defaultValue={userName}
                          onChange={(event) => setUserName(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Email:</div>
                        <Form.Control
                          type="email"
                          defaultValue={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Datum rođenja:</div>
                        <Form.Control
                          type="date"
                          className="date-input"
                          value={date}
                          onChange={(event) => setDate(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Adresa:</div>
                        <Form.Control
                          type="text"
                          defaultValue={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                      <div>
                        <div className="gray-text">Putanja do slike:</div>
                        <Form.Control
                          type="text"
                          defaultValue={imgPath}
                          onChange={(event) => setImgPath(event.target.value)}
                        />
                      </div>
                    </Form.Group>
                  ) : (
                    <div className="stack-card" tokens={{ childrenGap: 10 }}>
                      <div className="gray-text">Ime: {firstName}</div>
                      <div className="gray-text">Prezime: {lastName}</div>
                      <div className="gray-text">
                        Korisničko ime: {userName}
                      </div>
                      <div className="gray-text">Email: {email}</div>
                      <div className="gray-text">Datum rođenja: {date}</div>
                      <div className="gray-text">Adresa: {address}</div>
                      <div className="gray-text">
                        <span className="gray-text">
                          {role === 2
                            ? "Role : admin"
                            : role === 1
                            ? "Role : prodavac"
                            : "Role : kupac"}
                        </span>
                      </div>
                      <div className="gray-text">
                        Status:
                        {status == 0 ? (
                          <Clock16Filled className="pending-icon" />
                        ) : status == 1 ? (
                          <CheckboxChecked16Filled className="accepted-icon" />
                        ) : status == -1 ? (
                          <BugFilled className="rejected-icon" />
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <div className="submit-button-container">
                    <Button
                      onClick={handleSubmit}
                      styles={{ root: { marginBottom: "20px" } }} // Apply margin-bottom directly to the button
                    >
                      Sačuvaj
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="loading-text">Učitavanje...</div>
            )}
          </div>
        </Col>
      </Row>
      <Modal show={isDialogVisible} onHide={() => setIsDialogVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Username or email is already taken.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsDialogVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
