import React, { useContext, useEffect, useState } from "react";
import UserContext from '../components/context/UserContext';
import wiz1 from '../images/wiz1r.jpg';
import wiz2 from '../images/wiz2r.jpg';
import wiz3 from '../images/wiz3r.jpg';
import wiz4 from '../images/wiz4r.jpg';
import wiz5 from '../images/wiz5r.jpg';

export default function Login() {
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState("https://img.freepik.com/premium-vector/avatar-is-hooded-indicated-by-question-mark-anonymous-unauthorized-user-isolated-vector_619989-1333.jpg?w=2000");
  const [error, setError] = useState("");

  const { onUserLogin } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !username.replace(/\s/g, "").length) {
      setError("Please enter your name");
    } else {
      setError(null);
      onUserLogin(username, avatar);
    }
  };
  useEffect(() => {
    if(avatar === "1") {
      setAvatar(wiz1)
    }
    else if(avatar === "2") {
      setAvatar(wiz2)
    }
    else if(avatar === "3") {
      setAvatar(wiz3)
    }
    else if(avatar === "4") {
      setAvatar(wiz4)
    }
    else if(avatar === "5") {
      setAvatar(wiz5)
    } 
  }, [avatar]);
 
  return (
    <div className="login-page">
      <div className="form-wrapper"> 
      <h1>Wellcome to Wizard Chat</h1>
      <h3>~ Share your knowledge ~</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-div">
            <div className="username-header">
              Username
            </div>
            <input className="form-input" type="text" maxLength="9" onChange={(e) => setUsername(e.target.value)}
            />
            <div className="form-error-message">{error}</div>
          </div>
          <div className="form-avatar">
            <div>
              Avatar
            </div>
            <div className="login-avatars">
              <label htmlFor="1">
                <input type="radio" id="1" value="1" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img className="img-avatar" src={wiz1} alt="wizzard"/>
              </label>

              <label htmlFor="2">
                <input type="radio" id="2" value="2" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src={wiz2} alt="wizzard"/>
              </label>
              
              <label htmlFor="3">
                <input type="radio" id="3" value="3" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src={wiz3} alt="wizzard"/>
              </label>
              
              <label htmlFor="4">
                <input  type="radio" id="4" value="4" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src={wiz4} alt="wizzard" />
              </label>
    
              <label htmlFor="5">
                <input  type="radio" id="5" value="5" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src={wiz5} alt="wizzard" />
              </label>  
            </div>
          </div>
          <div className="form-control">
            <button type="submit" className="login_button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
