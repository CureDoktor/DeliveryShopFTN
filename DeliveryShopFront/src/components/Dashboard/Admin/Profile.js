import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogType } from "@fluentui/react";
import { Pen } from "react-bootstrap-icons";
import { AuthContext } from "../../AuthContext";
import AdminTopBar from "./AdminTopBar";
import "./Profile.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Users, usersUpdate } from "../../../hooks/ApiService";
import AdminSideBar from "./AdminSideBar";
import { Row, Col } from "react-bootstrap";

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

  const { id, role, ...userProfile } = userData || {};

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
      <AdminTopBar />

      {userProfile ? (
        <Row>
          <Col md={2}>
            <AdminSideBar />
          </Col>
          <Col md={8}>
            <div className="container col-md-8 mx-auto pt-5">
              <div>
                <h3 className="card-title py-4 text-center">
                  Korisnički profil
                </h3>
                <div
                  onClick={handleEditClick}
                  className="ms-3 mx-auto d-block cursor-pointer"
                >
                  <span className="pe-2">Edit profile </span>
                  <Pen className={` ${isEditMode ? "active" : ""}`} />
                </div>
              </div>
              <div className="pt-5">
                {isEditMode ? (
                  <Form className="stack" style={{ gap: "10px" }}>
                    <div>
                      <Form.Label className="gray-text">Name:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                    <div>
                      <Form.Label className="gray-text">Lastname:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <div>
                      <Form.Label className="gray-text">Username:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={userName}
                        onChange={(event) => setUserName(event.target.value)}
                      />
                    </div>
                    <div>
                      <Form.Label className="gray-text">Email:</Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div>
                      <Form.Label className="gray-text">DOB:</Form.Label>
                      <Form.Control
                        type="date"
                        className="date-input"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </div>
                    <div>
                      <Form.Label className="gray-text">Address:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </div>
                    {/* <div>
                      <Form.Label className="gray-text">
                        Putanja do slike:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={imgPath}
                        onChange={(event) => setImgPath(event.target.value)}
                      />
                    </div> */}
                  </Form>
                ) : (
                  <div className="stack" tokens={{ childrenGap: 20 }}>
                    <div className="gray-text py-2">
                      Ime: <span className="font-bold">{firstName}</span>
                    </div>
                    <div className="gray-text py-2">Lastname: {lastName}</div>
                    <div className="gray-text py-2">
                      Korisničko ime: {userName}
                    </div>
                    <div className="gray-text py-2">Email: {email}</div>
                    <div className="gray-text py-2">DOB: {date}</div>
                    <div className="gray-text py-2">Address: {address}</div>
                    <div className="gray-text py-2">
                      <div className="gray-text">
                        {role === 2
                          ? "Role : Admin"
                          : role === 1
                          ? "Role : Seller"
                          : "Role : Customer"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {isEditMode && (
                <div className="submit-button-container">
                  <Button
                    className="primary-button"
                    onClick={handleSubmit}
                    styles={{ root: { marginBottom: "20px" } }} // Apply margin-bottom directly to the button
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <span className="loading-text">Loading...</span>
      )}

      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Error",
          subText: "Username or email is already taken.",
        }}
      />
    </div>
  );
}

export default Profile;
