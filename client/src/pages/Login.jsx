import MyNav from "../components/MyNav";
import { Form, Container, Button } from "react-bootstrap";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import { loggedContext } from "./../App";

function Login() {
  const navigate = useNavigate();
  const inputName = useRef(null);
  const inputPass = useRef(null);
  const [err, setErr] = useState(false);
  const { isLogged, setIsLogged } = useContext(loggedContext);

  useEffect(() => {
    if (isLogged === true) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    const data = {
      username: inputName.current.value,
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
      localStorage.setItem("user", JSON.stringify(dataRes.userData));
      setIsLogged(true);
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
          <Form.Group className="mb-3">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              className={styles.input}
              ref={inputName}
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
