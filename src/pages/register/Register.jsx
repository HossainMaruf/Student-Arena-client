import "./register.css";
import { useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value != password.current.value) {
      //password.current.setCustomValidity("Password don't match");
      console.log("Not Match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">
            <img src={PF + "pust.png"} />
          </h3>
          <span className="loginDesc">Student Arena</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              className="loginInput"
              required
              ref={username}
              placeholder="Username"
            />
            <input
              type="email"
              className="loginInput"
              required
              ref={email}
              placeholder="Email"
            />
            <input
              type="password"
              minLength="6"
              className="loginInput"
              required
              placeholder="Password"
              ref={password}
            />
            <input
              type="password"
              minLength="6"
              className="loginInput"
              required
              placeholder="Confirm Password"
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sing Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Login into account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
