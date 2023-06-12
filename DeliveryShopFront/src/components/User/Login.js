import React, { useState, useContext, useEffect } from "react";
import { Link } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { AuthContext } from "../AuthContext";
import { userLoginGoogle, userLogin } from "../../hooks/ApiService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext); // Change here
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);

    handleGoogleLogin(userObject.email, "somedummy98/A");
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

  const handleGoogleLogin = async (username, password) => {
    const response = await userLoginGoogle(username, password);
    const data = await response.json();

    if (response.ok) {
      const decodedToken = jwt_decode(data.token);

      setAuthToken(data.token); // Change here

      const { Role } = decodedToken;

      if (Role == 2) {
        navigate("/admin-dashboard");
      } else if (Role == 1) {
        navigate("/seller-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } else if (response.status === 400) {
      setError("Incorrect username or password.");
    } else {
      console.log(data.statusCode);
    }
  };
  const handleLogin = async () => {
    const response = await userLogin(username, password);

    const data = await response.json();

    if (response.ok) {
      const decodedToken = jwt_decode(data.token);

      setAuthToken(data.token); // Change here

      const { Role } = decodedToken;

      if (Role == 2) {
        navigate("/admin-dashboard");
      } else if (Role == 1) {
        navigate("/seller-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } else if (response.status === 400) {
      setError("Incorrect username or password.");
    } else {
      console.log(data.statusCode);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handlePasswordReset = () => {
    navigate("/pass-reset");
  };

  return (
    <div className="login-container">
      <div style={{ width: "400px" }}>
        <h2 className="pb-5 text-center">Prijava</h2>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Korisničko ime</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="py-5" controlId="password">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
        </Form>
        {error && <div className="error-message">{error}</div>}
        <div className="py-4 mx-auto d-block">
          <Button onClick={handleLogin} className="mx-auto d-block w-100">
            Prijavi se
          </Button>
        </div>
        <div className="w-60 mx-auto d-block">
          <div id="signInDiv"></div>
        </div>
        <div className="stack text-center py-3">
          <Link onClick={handleRegister}>
            Niste registrovani? Registrujte se
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
