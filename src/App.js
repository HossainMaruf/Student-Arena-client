import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { useContext , useEffect} from "react";
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {AuthContext} from './context/AuthContext';
import Favicon from 'react-favicon'

function App() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {

  }, [])

  return (
    <>
    <Favicon url={PF+"favicon.ico"} />
    <Router>
      {user?
          (<Switch>
              <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
              <Route path="/register">{user ? <Redirect to="/" /> : <Register />}</Route>
              <Route exact path="/profile/:username"><Profile /></Route>       
              <Route path="/"><Home /></Route>
          </Switch>) : (
              <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route path="/" >
                        <Register/>
                      </Route>
              </Switch>
          )
    }
    </Router>
    </>
  );
}

export default App;
