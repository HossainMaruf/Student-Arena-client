import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import "./sidebar.css";

import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CloseFriend from '../../components/closeFriend/CloseFriend';
import {AuthContext} from '../../context/AuthContext';
import {Users} from '../../dummyData';

export default function Sidebar() {
  const {user} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
        try {
          const membersList = await axios.get("/users/all");
          // console.log(membersList);
          setMembers(membersList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMembers();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <p><strong>{members.length} Members</strong></p>
        <ul className="sidebarFriendList">
            {members.map((member, index) => {
              return(
                <Link to={"/profile/" + member.username}
                    style={{ textDecoration: "none" }}
                    key={index}>
                <CloseFriend key={member.id} user={member} />
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
