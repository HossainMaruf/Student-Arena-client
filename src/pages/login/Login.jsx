import {useRef, useContext} from 'react';
import './login.css';
import {loginCall} from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
import {Link} from 'react-router-dom';

export default function Login() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    }
    // console.log(user);
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo"><img src={PF + "pust.png"}/></h3>
            <span className="loginDesc">Student Arena</span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                type="email"
                className="loginInput"
                placeholder="Email"
                required
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="Password"
                required
                ref={password}
                minLength="6"
              />
              <button
                className="loginButton"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? <CircularProgress color="secondary" /> : "Log In"}
              </button>
              <span className="loginForgot">Forgot Password</span>
              <Link to="/register">
                <button className="loginRegisterButton" disabled={isFetching}>
                  {isFetching ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "Create a new account"
                  )}
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}
