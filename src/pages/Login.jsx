import React, { useContext, useEffect, useState } from "react";
import UserContext from '../components/context/UserContext';

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
      setAvatar("https://i.pinimg.com/originals/2f/b4/f4/2fb4f44160a899a9aeca4a8a4c36ac80.jpg")
    }
    else if(avatar === "2") {
      setAvatar("https://i.pinimg.com/originals/8c/cc/42/8ccc42bfd85b2eb0105888c826745c62.jpg")
    }
    else if(avatar === "3") {
      setAvatar("https://media.istockphoto.com/id/1175214864/photo/mysterious-hooded-man.jpg?s=612x612&w=0&k=20&c=pIWaVKAn9_5eZOyh0P84Q7v7mXbvpyk-tk4UXjN2Cog=")
    }
    else if(avatar === "4") {
      setAvatar("https://i.pinimg.com/originals/9f/d8/af/9fd8af1a1c88a1d69a76663a2c02aa9f.jpg")
    }
    else if(avatar === "5") {
      setAvatar("https://i.pinimg.com/originals/a0/55/01/a055010ccfde85c1a33178b85c568e10.jpg")
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
            <input className="form-input" type="text" maxLength="10" onChange={(e) => setUsername(e.target.value)}
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
                <img className="img-avatar" src="https://i.pinimg.com/originals/2f/b4/f4/2fb4f44160a899a9aeca4a8a4c36ac80.jpg" alt="wizzard"/>
              </label>

              <label htmlFor="2">
                <input type="radio" id="2" value="2" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src="https://i.pinimg.com/originals/8c/cc/42/8ccc42bfd85b2eb0105888c826745c62.jpg" alt="wizzard"/>
              </label>
              
              <label htmlFor="3">
                <input type="radio" id="3" value="3" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src="https://media.istockphoto.com/id/1175214864/photo/mysterious-hooded-man.jpg?s=612x612&w=0&k=20&c=pIWaVKAn9_5eZOyh0P84Q7v7mXbvpyk-tk4UXjN2Cog=" alt="wizzard"/>
              </label>
              
              <label htmlFor="4">
                <input  type="radio" id="4" value="4" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src="https://i.pinimg.com/originals/9f/d8/af/9fd8af1a1c88a1d69a76663a2c02aa9f.jpg" alt="wizzard" />
              </label>
    
              <label htmlFor="5">
                <input  type="radio" id="5" value="5" name="wizards" onChange={(e) => setAvatar(e.target.value)} />
                <img src="https://i.pinimg.com/originals/a0/55/01/a055010ccfde85c1a33178b85c568e10.jpg" alt="wizzard" />
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
