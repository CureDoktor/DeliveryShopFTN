import Form from "react-bootstrap/Form";
import { useContext, useState, React } from "react";
import { Col, Container, Button, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { userLogin } from "../../store/ApiService";
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode";

function Login(props) {
  const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    password: "",
    username: "",
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

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userLogin(formData);
      console.log(response.data.token);
      const decodedToken = decodeJWT(response.data.token);
      authCtx.settingToken(response.data.token);
      props.setDashboard(decodedToken.Role);
      localStorage.setItem("Dashboard", decodedToken.Role);
      props.setLogin();
    } catch (err) {
      console.log("Username or password are not good!");
    }
  };

  return (
    <Container>
      <div className={styles.fieldOne}>
        <Col md={{ span: 7, offset: 5 }}>
          <div className={styles.callUs}></div>
        </Col>
        <div className="text-center">
          <h2>Login</h2>
          <p className={styles.grayText}>
            Please fill out the following fields to login.
          </p>
          <br />
        </div>
        <Col md={{ span: 6, offset: 3 }}>
          <div className={styles.formField}>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="userName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    name="username"
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter Username"
                    value={formData.username}
                    className={styles.formControl}
                  />
                  <Form.Control.Feedback type="invalid">
                    Incorrect Username
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br />
              <Row className="mb-3">
                <Form.Group as={Col} controlId="password">
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
              </Row>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
              <br />
              <br />
              <Button
                variant="primary"
                className={styles.submitBtn}
                type="submit"
              >
                Login
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
          </div>
          <Button
            onClick={() => {
              props.dontHaveAccount();
            }}
          >
            You don't have account?
            <span className={styles.blueText}> Register Now</span>
          </Button>
        </Col>
      </div>
    </Container>
  );
}
export default Login;
