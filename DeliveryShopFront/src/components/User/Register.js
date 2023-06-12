import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./Register.css";
import jwt_decode from "jwt-decode";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import Dropdown from "react-bootstrap/Dropdown";
import { userRegister } from "../../hooks/ApiService";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [imgPathError, setImgPathError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setEmail(userObject.email);
    setAddress("/");
    setUserName(userObject.email);
    setLastName(userObject.family_name);
    setFirstName(userObject.given_name);
    setShowPass(true);
    setImgPath(userObject.picture);
    setPassword("somedummy98/A");
    setConfirmPassword("somedummy98/A");
    handleSubmit();
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "390806400171-nhgvb4rgdke5d8gplln3pmrfr3mbph9t.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPath(reader.result);
      setImgPathError("");
    };

    reader.onerror = () => {
      console.error("An error occurred while reading the file");
      setImgPath("");
      setImgPathError("Failed to read the file");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgPath("");
    }
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!firstName) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!userName) {
      setUserNameError("Username is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!date) {
      setDateError("Date is required");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!imgPath) {
      setImgPathError("Image path is required");
      isValid = false;
    } else {
      setImgPathError("");
    }

    if (isValid) {
      const formData = {
        email,
        firstName,
        lastName,
        userName,
        password,
        confirmPassword,
        date,
        role,
        address,
        imgPath,
        status: 0,
      };
      console.log("uso sam odje" + formData);
      try {
        const response = await userRegister(formData);

        const data = await response.json();

        if (response.ok) {
          // Handle success case
          console.log("Registration successful:", data);
          // Redirect to the desired page
          navigate("/login");
        } else {
          // Handle error case
          console.log("Error:", data.statusCode);

          if (
            data.statusCode === 400 &&
            data.message === "Email is already taken!"
          ) {
            setEmailError("Email is already taken");
          } else if (
            data.statusCode === 400 &&
            data.message === "Username is already taken!"
          ) {
            setUserNameError("Username is already taken");
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <Form>
      <h2 className=" pt-5 text-center pb-4">Registracija</h2>
      <div>
        <div hidden={showPass}>
          <Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  isInvalid={Boolean(emailError)}
                />
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>Ime</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  isInvalid={Boolean(firstNameError)}
                />
                <Form.Control.Feedback type="invalid">
                  {firstNameError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Prezime</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                  isInvalid={Boolean(lastNameError)}
                />
                <Form.Control.Feedback type="invalid">
                  {lastNameError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="userName">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  required
                  isInvalid={Boolean(userNameError)}
                />
                <Form.Control.Feedback type="invalid">
                  {userNameError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <div hidden={showPass}>
          <Row>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  isInvalid={Boolean(passwordError)}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Potvrda lozinke</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  isInvalid={Boolean(confirmPasswordError)}
                  hidden={showPass}
                />
                <Form.Control.Feedback type="invalid">
                  {confirmPasswordError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <Form.Group controlId="date">
          <Form.Label>Datum</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            isInvalid={Boolean(dateError)}
          />
          <Form.Control.Feedback type="invalid">
            {dateError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>Uloga</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="0">Kupac</option>
            <option value="1">Prodavac</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="address">
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
            isInvalid={Boolean(addressError)}
          />
          <Form.Control.Feedback type="invalid">
            {addressError}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <label
        htmlFor="profileImageInput"
        className="pt-3 pb-5"
        hidden={showPass}
      >
        <div className="d-flex py-2">
          <div className="upload-icon">
            <ArrowUpload16Filled />
          </div>
          <span>Odaberi sliku</span>
        </div>
        <input
          id="profileImageInput"
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </label>
      <div className="submit-button">
        <Button onClick={handleSubmit} style={{ width: "100%" }}>
          Registruj se
        </Button>
      </div>
      <div id="signInDiv" className="w-100"></div>
    </Form>
  );
}

function Register() {
  return (
    <div className="register-container">
      <RegisterForm />
    </div>
  );
}

export default Register;
