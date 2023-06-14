import MyNav from "../components/MyNav";
import { Form, Container, Button } from "react-bootstrap";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <MyNav />

      <Container className="mt-5 d-md-flex justify-content-center">
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className={styles.input}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className={styles.input}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
          <Button
            variant="outline-primary"
            className="mx-1"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
