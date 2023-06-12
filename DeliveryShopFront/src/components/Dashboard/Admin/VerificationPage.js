import React, { useEffect, useState, useContext } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  Image,
  Dialog,
  DialogType,
  DialogFooter,
  Text,
} from "@fluentui/react";
import { AuthContext } from "../../AuthContext";
import { Button } from "react-bootstrap";
import TopBar from "../Admin/AdminTopBar";
import "./VerificationPage.css";
import { useNavigate } from "react-router-dom";
import { getAllSellers, usersVerify } from "../../../hooks/ApiService";
import AdminSideBar from "./AdminSideBar";
import { Row, Col } from "react-bootstrap";

function VerificationPage() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState(""); // Stores the selected dialog action: "accept" or "decline"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSellers(token);
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleVerify = (user) => {
    setSelectedUser(user);
    setIsDialogVisible(true);
  };

  const handleConfirm = (action, user) => {
    setSelectedUser(user);
    setDialogAction(action);
    setIsDialogVisible(true);
  };

  const handleAction = async () => {
    const status = dialogAction === "accept" ? 1 : -1;
    const headers = {
      "Content-Type": "application/json",
      Token: token,
    };

    try {
      const response = await usersVerify(selectedUser, status, headers);

      if (response.ok) {
        console.log(
          `User ${dialogAction === "accept" ? "accepted" : "declined"}:`,
          selectedUser
        );
        navigate("/admin-dashboard"); // Reload the page
      } else {
        console.log(
          `Error ${
            dialogAction === "accept" ? "accepting" : "declining"
          } user:`,
          response.status
        );
      }
    } catch (error) {
      console.log(
        `Error ${dialogAction === "accept" ? "accepting" : "declining"} user:`,
        error
      );
    }

    setIsDialogVisible(false);
  };

  return (
    <div className="container">
      <TopBar />
      <Row>
        <Col sm={3}>
          <AdminSideBar />
        </Col>
        <Col sm={9}>
          <div className="card-container">
            {users.map((user) => (
              <DocumentCard key={user.id} className="user-card document-card">
                <div className="user-info">
                  <Image
                    src={user.imgPath || "placeholder-image-url"}
                    alt="User Image"
                    width={130}
                    height={120}
                  />
                  <div className="user-details">
                    <h3>{user.userName}</h3>
                    <div className="document-card-div">
                      <span>Email: {user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <Button
                    onClick={() => handleConfirm("accept", user)}
                    className="accept-button"
                  >
                    Prihvati
                  </Button>
                  <Button
                    onClick={() => handleConfirm("decline", user)}
                    className="reject-button"
                  >
                    Odbij{" "}
                  </Button>
                </div>
              </DocumentCard>
            ))}
          </div>
        </Col>
      </Row>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Verification",
          subText: `Are you sure you want to ${
            dialogAction === "accept" ? "accept" : "decline"
          } ${selectedUser?.userName}?`,
        }}
      >
        <DialogFooter>
          <Button
            onClick={handleAction}
            className={
              dialogAction === "accept" ? "accept-button" : "reject-button"
            }
          >
            {dialogAction === "accept" ? "Prihvati" : "Odbij"}{" "}
          </Button>
          <Button text="" onClick={() => setIsDialogVisible(false)}>
            {" "}
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default VerificationPage;
