import styles from "./../components/chat.module.scss";
import { Container, InputGroup, Button, Form } from "react-bootstrap";
import { useEffect, useState, useRef, useContext } from "react";
import io from "socket.io-client";
import { loggedContext } from "./../App";

const socket = io("http://localhost:5000");

function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const btnSend = useRef(null);
  const input = useRef(null);
  const { isLogged, setIsLogged } = useContext(loggedContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const chatBodyRef = useRef(null);

  useEffect(() => {
    socket.emit("render");
    socket.on("render", (messages) => {
      setChatLog(messages);

      // solve scroll
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    });
  }, []);

  useEffect(() => {
    const handleSend = () => {
      const messages = { author: user.username, content: input.current.value };
      input.current.value = "";

      socket.emit("messages", messages);
    };

    btnSend.current.addEventListener("click", handleSend);

    return () => {
      if (btnSend.current)
        btnSend.current.removeEventListener("click", handleSend);
    };
  });

  return (
    <Container className="my-5">
      <div className={styles.chatBox + " bg-light"}>
        <h3 className={styles.head + " p-3"}>Chat Box</h3>

        <div className={styles.chatBody + " p-3"} ref={chatBodyRef}>
          {chatLog.map((data, idx) => (
            <div key={idx}>
              <p className={styles.mySend + " p-2"}>
                <span className={styles.author}>{data.author}</span>{" "}
                {data.content}
              </p>
            </div>
          ))}
        </div>

        <InputGroup className="mb-3 ">
          {isLogged ? (
            <>
              <Form.Control
                placeholder="Write some here"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                ref={input}
              />
              <Button
                variant="secondary"
                id="button-addon2"
                size="lg"
                ref={btnSend}
              >
                Gửi
              </Button>
            </>
          ) : (
            <>
              <Form.Control
                placeholder="Vui lòng đăng nhập"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                ref={input}
                disabled
              />
              <Button
                variant="secondary"
                id="button-addon2"
                size="lg"
                ref={btnSend}
                disabled
              >
                Gửi
              </Button>
            </>
          )}
        </InputGroup>
      </div>
    </Container>
  );
}

export default Chat;
