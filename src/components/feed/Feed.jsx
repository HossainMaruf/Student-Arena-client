import { React, useState, useEffect, useContext} from "react";
import axios from "axios";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import {AuthContext} from '../../context/AuthContext';
// import {Posts} from '../../dummyData';

export default function Feed({ username }) {
  //console.log(username);
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  useEffect(() => {
    (username
      ? axios.get("/posts/profile/"+username)
      : axios.get("/posts/timeline/"+user._id)
    )
      .then((res) => {
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt); 
        }));
      })
      .catch(() => {
        console.log("Error From Feed");
      });
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || (username === user.username)) && <Share /> }
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}
