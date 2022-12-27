import React, { useContext } from "react";
import ChatContext from "./context/ChatContext";

export default function MemberList() {
  const { membersArray } = useContext(ChatContext);

  return (
    <div className="chat-member-list-item">
      <div>Members:</div>
      {membersArray.map((member) => (
        <div className="chat-member-list-member-item" key={member.id}>
          <span className="member-list-avatar">
            <img src={member.clientData.avatar}/>
          </span>
          <span className="chat-member-list-member-username">
            {member.clientData.username}
          </span>
        </div>
      ))}
    </div>
  );
}
