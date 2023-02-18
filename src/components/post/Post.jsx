import { useState, useEffect, useContext, setState} from "react";
import {Link} from 'react-router-dom';
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import {AuthContext} from '../../context/AuthContext';
import {Card, Dropdown, DropdownButton, Button, Modal} from 'react-bootstrap';
// import {Users} from '../../dummyData';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);

   const deletePostHandler = async () => {
    try {
      axios.delete('/posts/'+post._id);
      window.location.reload();
    } catch(error) {
      alert('Something went wrong!');
    }
   }

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes, currentUser]);

  useEffect(() => {
    axios
      .get(`/users?userId=${post.userID}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [post.userID, currentUser]);

  const likeHandler = () => {
    try {
      axios.put("/posts/"+post._id+"/like", {userID:currentUser._id});
    } catch {

    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"/profile/" + user.username} style={{ textDecoration: "none" }}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
                <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          {user.email == currentUser.email ? (
            <div className="postTopRight">
              <Dropdown>
                <Dropdown.Toggle className="caretIcon">
                  <MoreVert style={{cursor:'pointer'}}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setModalShow(true)}>Edit Post</Dropdown.Item>
                  <Dropdown.Item onClick={deletePostHandler}>Delete Post</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
            </div>
            ) : null}
        </div>
        {/*Modal Start*/}
      <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={(e) => {
          setModalShow(false);
        }}>
          <Modal.Title id="contained-modal-title-vcenter" className="modalProfile">
            <img className="topbarImg"
              alt="Avatar" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} />
              <small>{user.username}</small>            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
  {/*Modal End*/}
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img && !post.img.includes(".pdf")? PF+post.img : null} alt="" />
          {post.img && post.img.includes(".pdf") && (
              <div className="pdfContainer">
                  <i className="fas fa-file-pdf fa-7x"></i>
                  <span>{post.img}</span>
                  <a href={PF+post.img} target="_blank" className="btnDownload btn"><i className="fa fa-download"></i> Download</a>
              </div>
            )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
           {/* <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
            />*/}
            <img
              className="likeIcon"
              src="/assets/heart.png"
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
