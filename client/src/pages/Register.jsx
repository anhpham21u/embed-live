import MyNav from "../components/MyNav";
import { Form, Container, Button } from "react-bootstrap";
import styles from "./login.module.scss";
import { useRef } from "react";

function Register() {
  const inputEmail = useRef(null);
  const inputPass = useRef(null);

  const handleRegister = async () => {
    const data = {
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
      throw new Error("Có lỗi xảy ra khi gửi yêu cầu.");
    }

    const responseData = await response.json();
    console.log(responseData); // Hiển thị phản hồi từ máy chủ
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
