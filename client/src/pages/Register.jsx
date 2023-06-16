import MyNav from "../components/MyNav";
import { Form, Container, Button } from "react-bootstrap";
import styles from "./login.module.scss";
import { useRef } from "react";

function Register() {
  const inputEmail = useRef(null);
  const inputPass = useRef(null);

  const handleRegister = () => {
    console.log(inputEmail.current.value, inputPass.current.value);
  };

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
              ref={inputEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className={styles.input}
              ref={inputPass}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleRegister}>
            Sign up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
