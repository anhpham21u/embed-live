import styles from "./../components/chat.module.scss";
import { Container, InputGroup, Button, Form } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const btnSend = useRef(null);
  const input = useRef(null);

  socket.on("render", (messages) => {
    setChatLog(messages);
  });

  useEffect(() => {
    const handleSend = () => {
      const newChatLog = [...chatLog, input.current.value];
      setChatLog(newChatLog);
      input.current.value = "";

      console.log(newChatLog);

      const messages = {
        content: newChatLog,
      };

      socket.emit("messages", messages);
    };

    btnSend.current.addEventListener("click", handleSend);

    return () => {
      btnSend.current.removeEventListener("click", handleSend);
    };
  });

  return (
    <Container className="my-5">
      <div className={styles.chatBox + " bg-light"}>
        <h3 className={styles.head + " p-3"}>Chat Box</h3>

        <div className={styles.chatBody + " p-3"}>
          {chatLog.map((data, idx) => (
            <div className="d-flex justify-content-end">
              <p key={idx} className={styles.mySend + " p-2"}>
                {data}
              </p>
            </div>
          ))}
        </div>

        <InputGroup className="mb-3 ">
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
        </InputGroup>
      </div>
    </Container>
  );
}

export default Chat;
