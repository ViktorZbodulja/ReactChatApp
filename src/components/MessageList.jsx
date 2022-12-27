import React, { useContext } from "react";
import ChatContext from "./context/ChatContext";
import UserContext from "./context/UserContext";

export default function ChatMessageList() {
  const { messageArray } = useContext(ChatContext);
  const { user } = useContext(UserContext);

  function getWrapperClass(message) {
    return `${
      user.id === message.user.id ? "my-item" : "others-item"
    }`;
  }

  function getMessageClass(message) {
    return `${
      user.id === message.user.id ? "my-message" : "others-message"
    }`;
  }

  return (
    <div className="chat-messages">
      {messageArray.map((msg) => {
        if (msg.type === "MEMBER_JOINED") {
          return (
            <div
              className="message_joined-left"
              key={msg.id}
            >
              <div className="message-joined">
                {msg.user.username} {msg.message}
              </div>
            </div>
          );
        } else if (msg.type === "MEMBER_LEFT") {
          return (
            <div className="message_joined-left" key={msg.id}>
              <div className="message-left">
                {msg.user.username} {msg.message}
              </div>
            </div>
          );
        } else {
          return (
            <div className={getWrapperClass(msg)} key={msg.id}>
              <div className="message-avatar"><img src={msg.user.avatar}/></div>
              <div className="message_message-item">
                <div className={getMessageClass(msg)}>{msg.message}</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
