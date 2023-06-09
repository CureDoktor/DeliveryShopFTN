import AuthContext from "../../store/auth-context";
import { useContext, useState, React } from "react";
import { Col, Container, Button, Row, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { userRegister } from "../../store/ApiService";
import jwt_decode from "jwt-decode";

function Register(props) {
  const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    date: "",
    role: 1,
    address: "",
    imgPath: "",
  });

  const decodeJWT = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userRegister(formData);
      const decodedToken = decodeJWT(response.token);
      authCtx.settingToken(response.token);
      props.setDashboard(decodedToken.Role);
      localStorage.setItem("Dashboard", decodedToken.Role);
      props.setLogin();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className={styles.container}>
        <h2>Register page</h2>
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
          <Form.Group as={Col} controlId="name" className={styles.group}>
            <Form.Label className={styles.label}>Username</Form.Label>
            <Form.Control
              required
              name="userName"
              type="text"
              onChange={handleChange}
              value={formData.userName}
              className={styles.formControl}
            />
            <Form.Control.Feedback type="invalid">
              Incorrect User Name
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
          <Form.Group as={Col} controlId="password" className={styles.group}>
            <Form.Label className={styles.label}>Password</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              className={styles.formControl}
            />
            <Form.Control.Feedback type="invalid">
              Incorrect Password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="Password-retype"
            className={styles.group}
          >
            <Form.Label className={styles.label}>Password Retype</Form.Label>
            <Form.Control
              required
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={formData.confirmPassword}
              className={styles.formControl}
            />
            <Form.Control.Feedback type="invalid">
              Incorrect Password Retype
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
        <Row className="mb-3">
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Select Norm Type</Form.Label>
            <Form.Control
              as="select"
              value={formData.role}
              name="role"
              onChange={(e) =>
                handleChange({
                  target: { value: e.target.value, name: "role" },
                })
              }
            >
              <option value={1}>Prodavac</option>
              <option value={0}>Kupac</option>
            </Form.Control>
          </Form.Group>
        </Row>
        {/* <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Select
        className={styles.formControl}
        value={formData.state}
        name="state"
        onChange={handleChange}
      >
        <option>Choose...</option>
        <option>...</option>
      </Form.Select>
    </Form.Group>
    <Form.Group
      as={Col}
      controlId="Year-of-birth"
      className={styles.group}
    >
      <Form.Label className={styles.label}>
        Year of Birth
      </Form.Label>
      <Form.Control
        required
        name="yearOfBirth"
        type="number"
        onChange={handleChange}
        value={formData.yearOfBirth}
        className={styles.formControl}
      />
      <Form.Control.Feedback type="invalid">
        Incorrect Year of Birth
      </Form.Control.Feedback>
    </Form.Group>
  </Row> */}
        {/* <Form.Label>Gender</Form.Label>
  <Row>
    {gender.map((radio, idx) => (
      <Col key={idx} xs={3}>
        <ToggleButton
          id={`radio-${idx}`}
          type="radio"
          name="radio"
          className={styles.buttons}
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      </Col>
    ))}
  </Row> */}
        <br />
        <br />
        <br />
        <br />

        <Button
          variant="primary"
          className={styles.submitBtn + " " + styles.Button}
          type="submit"
        >
          Sign Up
        </Button>
        <p className="text-center pt-4 pb-4">OR</p>
        <Button
          variant="primary"
          className={styles.continueWithGoogle + " " + styles.Button}
          type="submit"
        >
          Continue with Google
        </Button>
      </Form>
      <br />
      <Button
        className={styles.Button}
        onClick={() => {
          props.backToLogin();
        }}
      >
        Already have an account? Go back to login
      </Button>
    </>
  );
}

export default Register;
