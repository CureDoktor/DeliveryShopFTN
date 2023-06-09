import AuthContext from "../../store/auth-context";
import { useEffect, useContext, useState } from "react";
import { userGetProfile } from "../../store/ApiService";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { userUpdate } from "../../store/ApiService";

function ProfileForm({ profile, updateProfile }) {
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: profile.userName,
    date: "",
    password: "",
    confirmPassword: "",
    role: profile.role,
    address: "",
    imgPath: profile.imgPath,
    status: profile.status,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateUserProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await userUpdate(formData, authCtx.Token());
      console.log(response);
      updateProfile();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Col>
        <Form onSubmit={updateUserProfile} className={styles.container}>
          <br />
          <br />
          <br />
          <h2>Update information</h2>
          <Row className="mb-3">
            <Form.Group controlId="email" className={styles.group}>
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                className={styles.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect Email
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="email" className={styles.group}>
              <Form.Label className={styles.label}>First Name</Form.Label>
              <Form.Control
                required
                name="firstName"
                type="text"
                onChange={handleChange}
                value={formData.firstName}
                className={styles.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect First Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="Lastname" className={styles.group}>
              <Form.Label className={styles.label}>Lastname</Form.Label>
              <Form.Control
                required
                name="lastName"
                type="text"
                onChange={handleChange}
                value={formData.lastName}
                className={styles.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect Lastname
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="date" className={styles.group}>
              <Form.Label className={styles.label}>Date</Form.Label>
              <Form.Control
                required
                name="date"
                type="date"
                onChange={handleChange}
                value={formData.date}
                className={styles.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect Date
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="Address" className={styles.group}>
              <Form.Label className={styles.label}>Address</Form.Label>
              <Form.Control
                required
                name="address"
                type="text"
                onChange={handleChange}
                value={formData.address}
                className={styles.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect Address
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <br />
          <br />
          <br />
          <br />

          <Button
            variant="primary"
            className={styles.submitBtn + " " + styles.Button}
            type="submit"
          >
            Update profile
          </Button>
        </Form>
        <br />
      </Col>
    </Container>
  );
}

export default ProfileForm;
