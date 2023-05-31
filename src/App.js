import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { AuthContextProvider } from "../src/store/auth-context.js";
import Logreg from "./components/Logreg/logreg";

// const [isLogedIn, setIsLoggedIn] = useState(false);

// useEffect(() => {
//   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
//   if (storedUserLoggedInInformation === "1") {
//     setIsLoggedIn(true);
//   }
// }, []);

function App() {
  return (
    <AuthContextProvider>
      <Logreg />
    </AuthContextProvider>
  );
}

export default App;
