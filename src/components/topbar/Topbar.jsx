import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import { MoreVert } from "@material-ui/icons";
import { Button, Dropdown, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import EasyEdit from 'react-easy-edit';
import axios from 'axios';
import {updateCall} from '../../apiCalls';
// import EditableLabel from 'react-inline-edit';

import "./topbar.css";

export default function Topbar() {
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch} = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);

  const renderNameTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    click to edit name
  </Tooltip>
); 

  const renderEmailTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    click to edit email
  </Tooltip>
); 

  const renderPasswordTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    click to edit password
  </Tooltip>
);

  const MoreVertStyle = {
    cursor: "pointer",
  };
  
  useEffect(() => {

  },[user]);

  // Helper function
  const saveName = async (value) => {
    try {
      console.log(value);
      updateCall({userID:user._id, username:value}, dispatch);
      //window.location.reload();
    } catch(error) {
        alert('Update Failed');
    }
  }

  const saveEmail = async (value) => {
    try {
      updateCall({userID:user._id, email:value}, dispatch);
      //window.location.reload();
    } catch(error) {
        alert('Update Failed');
    }
  }

  const savePassword = async (value) => {
    try {
      updateCall({userID:user._id, password:value}, dispatch);
      //window.location.reload();
      //localStorage.clear();
    } catch(error) {
        alert('Update Failed');
    }
  }
  const cancel = () => {}

  return (
    <>
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
        <Modal.Body className="modalBody">

          <div className="modalBodyItem">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderNameTooltip}
              >
              <Button variant="secondary">
               <EasyEdit
                  type="text"
                  value={user.username}
                  onSave={saveName}
                  onCancel={cancel}
                  className="easyEditItem"
                  saveButtonLabel="Save"
                  cancelButtonLabel="Cancel"
                  attributes={{ name: "awesome-input", id: 1}}
                />
              </Button>
            </OverlayTrigger>
          </div>

          <div>
               <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderEmailTooltip}
                  >
                  <Button variant="secondary">
                   <EasyEdit
                  type="email"
                  value={user.email}
                  onSave={saveEmail}
                  onCancel={cancel}
                  saveButtonLabel="Save"
                  cancelButtonLabel="Cancel"
                  attributes={{ name: "awesome-input", id: 1}}
                />
                  </Button>
                </OverlayTrigger>
            </div>

            <div>
            <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderPasswordTooltip}
                  >
                  <Button variant="secondary">
                   <EasyEdit
              type="password"
              value={user.password}
              onSave={savePassword}
              onCancel={cancel}
              saveButtonLabel="Save"
              cancelButtonLabel="Cancel"
              attributes={{ name: "awesome-input", id: 1}}
            />
                  </Button>
                </OverlayTrigger>
            
            </div>
         {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>*/}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
  {/*Modal End*/}
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">
              <img src={PF + "pust.png"} />
            </span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchBar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <span className="topbarLink">News</span>
            </Link>
            <Link
              to={"/profile/" + user.username}
              style={{ textDecoration: "none", color: "white" }}
            >
              <span className="topbarLink">Profile</span>
            </Link>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              className="topbarImg"
              alt="Avatar"
            />
          </Link>
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setModalShow(true)}>Edit Profile</Dropdown.Item>
              <Dropdown.Item
                href="/login"
                onClick={(e) => {
                  localStorage.clear();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
