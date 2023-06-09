import AuthContext from "../../store/auth-context";
import { useEffect, useContext, useState } from "react";
import { userGetProfile } from "../../store/ApiService";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { userUpdate } from "../../store/ApiService";
import ProfileForm from "../ProfileForm/profile";

function Profile() {
  const authCtx = useContext(AuthContext);

  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "das",
    date: "",
    role: 0,
    address: "",
    imgPath: "dd",
    status: 0,
  });

  const getUserProfile = async () => {
    try {
      const response = await userGetProfile(authCtx.Token());
      setProfile(response.user);
    } catch (err) {
      console.log(err);
    }
  };

  var rolePreview = "";
  var statusPreview = "";

  if (profile.role == 1) {
    rolePreview = "Seller";
  } else if (profile.role == 2) {
    rolePreview = "Customer";
  } else {
    rolePreview = "Admin";
  }

  if (profile.status == 0) {
    statusPreview = "On pending";
  } else if (profile.role == 1) {
    statusPreview = "Accepted";
  } else {
    statusPreview = "Rejected";
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Container>
      <Row>
        <Col className={styles.primaryColumn}>
          <Row className={styles.rows}>
            <Col>{profile.email}</Col>
          </Row>
          <Row className={styles.rows}>
            <Col>{profile.userName}</Col>
          </Row>

          <Row className={styles.rows}>
            <Col>{profile.firstName}</Col>
          </Row>
          <Row className={styles.rows}>
            <Col>{profile.lastName}</Col>
          </Row>
          <Row className={styles.rows}>
            <Col>{profile.date}</Col>
          </Row>
          <Row className={styles.rows}>
            <Col>{profile.address}</Col>
          </Row>
          <Row className={styles.rows}>
            <Col>Role: {rolePreview}</Col>
            <Col>Status: {statusPreview}</Col>
          </Row>
          <Row className={styles.rows}></Row>
        </Col>

        <Col>
          <ProfileForm profile={profile} updateProfile={getUserProfile} />
          <br />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
