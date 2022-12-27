import React, { useContext } from "react";
import ChatContext from "./context/ChatContext";

export default function ChatHeader() {
  const { onClickLogout, user } = useContext(ChatContext);

  return (
    <div className="chat-header-item">
      <div className="chat-header-greetings-msg">
        <div>Hello {user.username}!</div>
      </div>
      <div className="chat-header-button">
        <button className="chat-header-logout-button" onClick={onClickLogout} type="submit">
          LogOut
        </button>
      </div>
    </div>
  );
}
