import MyNav from "../components/MyNav";
import { Form, Container, Button } from "react-bootstrap";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const inputEmail = useRef(null);
  const inputPass = useRef(null);
  const [err, setErr] = useState(false);

  const handleLogin = async () => {
    const data = {
      email: inputEmail.current.value,
      password: inputPass.current.value,
    };

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setErr(true);
    } else {
      const dataRes = await response.json();
      console.log(dataRes.token);
      localStorage.setItem("token", dataRes.token);
      navigate("/");
    }
  };

  return (
    <div>
      <MyNav />

      <Container className="mt-5 d-md-flex justify-content-center">
        {err && (
          <p className={styles.errName}>Sai tên tài khoản hoặc mật khẩu</p>
        )}
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
          <Button variant="primary" onClick={handleLogin}>
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
