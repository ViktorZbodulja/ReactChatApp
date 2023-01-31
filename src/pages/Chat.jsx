import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../components/context/ChatContext";
import UserContext from "../components/context/UserContext";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MemberList from "../components/MemberList";
import SendMessage from "../components/SendMessage";

const DEFAULT_ROOM_NAME = "observable-default-room";

export default function Chat() {
  const { user, drone, userLogout } = useContext(UserContext);

  const [messageArray, setMessageArray] = useState([]);
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    const storedMessageArray = JSON.parse(localStorage.getItem('messageArray'));
    const storedMembersArray = JSON.parse(localStorage.getItem('membersArray'));
    if (storedMessageArray && storedMembersArray) {
        setMessageArray(storedMessageArray);
        setMembersArray(storedMembersArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messageArray', JSON.stringify(messageArray));
    localStorage.setItem('membersArray', JSON.stringify(membersArray));
  }, [messageArray, membersArray]);
  
  useEffect(() => {
    if (user) {
      setupRoom(drone);
    }
  }, [user, drone]);

  function setupRoom(scaledrone) {
    scaledrone.on("error", (error) => console.error(error));

    const room = scaledrone.subscribe(DEFAULT_ROOM_NAME);

    room.on("error", (error) => console.error(error));

    room.on("members", function (members) {
      setMembersArray([...members]);
    });

    room.on("member_join", function (member) {
      setMembersArray(function (current) {
        return [...current, member];
      });

      setMessageArray((current) => {
        return [
          ...current,
          {
            message: "has joined the chat!",
            id: Math.random(),
            type: "MEMBER_JOINED",
            user: {
              username: member.clientData.username,
              avatar: member.clientData.avatar,
            },
          },
        ];
      });
    });

    room.on("member_leave", function (member) {
      setMembersArray((current) => {
        return current.filter((oneMember) => oneMember.id !== member.id);
      });
      setMessageArray((current) => {
        return [
          ...current,
          {
            message: "has left the chat!",
            id: Math.random(),
            type: "MEMBER_LEFT",
            user: {
              username: member.clientData.username,
              avatar: member.clientData.avatar,
            },
          },
        ];
      });
    });

    room.on("message", (message) => {
      setMessageArray((current) => {
        return [
          ...current,
          {
            message: message.data.message,
            id: message.id,
            type: "MESSAGE",
            user: {
              id: message.member.id,
              username: message.member.clientData.username,
              avatar: message.member.clientData.avatar,
            },
          },
        ];
      });
    });
  }

  function publishMessage(message) {
    drone.publish({
      room: DEFAULT_ROOM_NAME,
      message: { message },
    });
  }

  function onClickLogout() {
    userLogout();
  }

  return (
    <div className="chat">
      <ChatContext.Provider value={{ publishMessage, onClickLogout, messageArray, membersArray, user }}>
        <div className="chat-header">
          <ChatHeader />
        </div>
        <div className="chat-main">
          <div className="chat-main-item">
              <div className="chat-main-members">
                <MemberList />
              </div>
              <div className="flex-mess-wrapper">
                <div className="chat-main-messages">
                  <MessageList />
                </div>
                <div className="chat-footer">
                  <SendMessage />
                </div>
              </div>  
          </div>
        </div>
      </ChatContext.Provider>
    </div>
  );
}
