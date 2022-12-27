import React, { useContext, useState } from "react";
import ChatContext from "./context/ChatContext";

export default function ChatSendMessage() {
  const { publishMessage } = useContext(ChatContext);

  const [message, setMessage] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (message && message.replace(/\s/g, "").length > 0) {
      publishMessage(message);
      setMessage("");
    }
  }

  return (
    <div className="footer-send-message-item">
      <div className="footer-send-message-div">Message: </div>
      <div className="footer-send-message-form">
        <form className="message-form-item" onSubmit={sendMessage}>
          <input className="message-form-input" type="text" onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="message-form-button">Send</button>
        </form>
      </div>
    </div>
  );
}
