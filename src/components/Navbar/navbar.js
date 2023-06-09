import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

function Nav(props) {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#">Delivery Shop</Navbar.Brand>
        {props.log ? (
          <Button onClick={props.log ? props.logout : props.login}>
            Logout
          </Button>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
}

export default Nav;
