import './closeFriend.css';
import {AuthContext} from '../../context/AuthContext';
import {useEffect, useContext} from 'react';

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {u} = useContext(AuthContext);
  useEffect(() => {

  }, [u]);
    return (
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    );
}
