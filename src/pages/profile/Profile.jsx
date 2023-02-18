import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import {useParams} from 'react-router';

export default function Profile() {
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);
  const username = useParams().username;
  //console.log(username);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   useEffect(() => {
     axios
       .get(`/users?username=${username}`)
       .then((res) => {
        //console.log(res.data);
         setUser(res.data);
       })
       .catch(() => {
         console.log("Error");
       });
   }, [username]);
   useEffect(() => {

   }, [username], user);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
