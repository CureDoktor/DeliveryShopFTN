import AuthContext from "../../store/auth-context";
import { useContext, useState, React } from "react";
import { Col, Container, Button, Row, Form } from "react-bootstrap";
import styles from "./styles.module.css";

function Register(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_repeat: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
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
              name="password_repeat"
              type="password"
              onChange={handleChange}
              value={formData.passwordRetype}
              className={styles.formControl}
            />
            <Form.Control.Feedback type="invalid">
              Incorrect Password Retype
            </Form.Control.Feedback>
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

        <Button variant="primary" className={styles.submitBtn} type="submit">
          Sign Up
        </Button>
        <p className="text-center pt-4 pb-4">OR</p>
        <Button
          variant="primary"
          className={styles.continueWithGoogle}
          type="submit"
        >
          Continue with Google
        </Button>
      </Form>
      <Button
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
