import MyNav from "../components/MyNav";
import { Form, Container, Button } from "react-bootstrap";
import styles from "./login.module.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const inputEmail = useRef(null);
  const inputPass = useRef(null);
  const inputName = useRef(null);
  const [err, setErr] = useState(false);

  const handleRegister = async () => {
    const data = {
      username: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPass.current.value,
    };

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setErr(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <MyNav />

      <Container className="mt-5 d-md-flex justify-content-center">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            {err && (
              <p className={styles.errName}>
                Tên tài khoản đã có người sử dụng
              </p>
            )}
            <Form.Control
              type="text"
              placeholder="User Name"
              className={styles.input}
              ref={inputName}
            />
          </Form.Group>
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
