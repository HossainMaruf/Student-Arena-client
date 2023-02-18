import { React, useState, useEffect, useContext } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const {user:u} = useContext(AuthContext);
  //console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {

  }, [u, user]);

  const HomeRightbar = () => {
    const { user: currentUser, dispatch } = useContext(AuthContext);
    useEffect(() => {

    }, [currentUser, user]);
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Maruf</b> and <b>3 other friends</b> birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => {
            return <Online key={user.id} user={user} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(
      currentUser.followings.includes(user._id)
    );

    useEffect(() => {
      setFollowed(currentUser.followings.includes(user._id));
    }, [user._id, currentUser]);

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendsList = await axios.get("/users/friends/" + user._id);
          setFriends(friendsList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [currentUser]);

    const handleClick = async () => {
      try {
        if (followed) {
          await axios.put("/users/" + user._id + "/unfollow", {
            userID: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put("/users/" + user._id + "/follow", {
            userID: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
      } catch (err) {
        console.log(err);
      }
      setFollowed(!followed);
    };

    return (
      <>
        {user.username && user.password !== currentUser.password && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username ? (
          <div className="rightbarInfo">
            <h4 className="rightbarTitle">About</h4>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">
                {user.city ? user.city : "Not set yet"}
              </span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">
                {user.from ? user.from : "Not set yet"}
              </span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
                {user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : "Complicated"}
              </span>
            </div>
            <h4 className="rightbarTitle">Friends</h4>
            <div className="rightbarFollowings">
              {friends.map((friend, index) => {
                return (
                  <Link
                    to={"/profile/" + friend.username}
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <div className="rightbarFollowing">
                      <img
                        className="rightbarFollowingImg"
                        src={
                          friend.profilePicture
                            ? PF + friend.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                      />
                      <span className="rightbarFollowingName">
                        {friend.username}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
