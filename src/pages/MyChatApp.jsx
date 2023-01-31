import React, { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";
import UserContext from "../components/context/UserContext";

const CHANNEL_ID = "IlqHl0A5gJKU3Vsc";

export default function MyChatApp() {
  const [user, setUser] = useState("");
  const [drone, setDrone] = useState(null);

  function onUserLogin(username, avatar) {
    if (username) {
      const drone = new window.Scaledrone(CHANNEL_ID, {
        data: { username, avatar },
      });
      drone.on("open", () => {
        setDrone(drone);
        setUser({ id: drone.clientId, username, avatar });
      });
    }
  }

  function userLogout() {
    drone.close();
    setDrone(null);
    setUser(null);
  }
  
  return (
    <div>
      <UserContext.Provider value={{ user, drone, onUserLogin, userLogout }}>
        {!user ? <Login /> : <Chat /> }
      </UserContext.Provider>
    </div>
  );
}