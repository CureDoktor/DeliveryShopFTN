import Register from "../Register/register";
import Login from "../Login/login";
import React from "react";
import styles from "./logreg.module.css";
import Container from "react-bootstrap/esm/Container";
import Nav from "../Navbar/navbar";
import Dashboard from "../Dashboard/dashboard";
import { useState, useEffect } from "react";

function Logreg() {
  const [logRegDash, setIsLogRegDash] = useState(0);
  const [isLogedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
      setIsLogRegDash(2);
    }
  }, []);

  const goToRegister = () => {
    setIsLogRegDash(1);
  };

  const goToLogin = () => {
    setIsLogRegDash(0);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    setIsLogRegDash(2);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    setIsLogRegDash(0);
  };

  var content = "";

  if (logRegDash == 0) {
    content = <Login setLogin={loginHandler} dontHaveAccount={goToRegister} />;
  } else if (logRegDash == 1) {
    content = <Register backToLogin={goToLogin} />;
  } else {
    content = <Dashboard />;
  }
  return (
    <Container>
      <Nav log={isLogedIn} logout={logoutHandler} login={goToLogin} />
      {content}
    </Container>
  );
}
export default Logreg;
