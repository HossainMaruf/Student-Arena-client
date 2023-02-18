import "./share.css";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Worker, Viewer } from '@react-pdf-viewer/core'; 
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
import {Card} from 'react-bootstrap';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import {
  PermMedia,
  Room,
  Label,
  EmojiEmotions,
  AttachFileTwoTone,
  Cancel,
} from "@material-ui/icons";
//import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from "axios";

export default function Share() {
   // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [Imgfile, setImgFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {

  }, [desc]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userID: user._id,
      desc: desc,
    };

    // Photo Upload Begin
    if (Imgfile) {
      const fileName = Date.now() + Imgfile.name;
      const data = new FormData();
      data.append("file", Imgfile, fileName);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    // Photo Upload End 

    // PDF Upload Begin
    if (pdfFile) {
      const fileName = Date.now() + "_" + pdfFile.name;
      const data = new FormData();
      data.append("file", pdfFile, fileName);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    // PDF Upload End
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {console.log(error);}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <textarea
            type="text"
            className="shareInput"
            placeholder={"What's in your mind " + user.username + "?"}
            onChange = {(e) => {setDesc(e.target.value ? e.target.value : "")}}
          />
        </div>
        <hr className="shareHr"></hr>
        {Imgfile && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(Imgfile)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setImgFile(null)} />
          </div>
        )}

      {/*PDF Previewer Advance*/}
        {/*{pdfFile && (
          <div className="shareImgContainer">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile.filename}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker>
            <Cancel className="shareCancelImg" onClick={() => setPdfFile(null)} />
          </div>
        )}*/}

      {/*PDF Previewer Normal*/}

      {pdfFile && (
          <div className="shareImgContainer">
          <Card className="bg-primary text-white">
            <Card.Body>{pdfFile.name}</Card.Body>
          </Card>
            <Cancel className="shareCancelImg" onClick={() => setPdfFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="ImgFile" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="ImgFile"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {setImgFile(e.target.files[0])}}
              />
            </label>
            <label htmlFor="PDFfile" className="shareOption">
              <AttachFileTwoTone htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">PDF</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="PDFfile"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          {(Imgfile || pdfFile || desc) ? (
              <button className="shareButton disabled" type="submit">
                Share
              </button>
            ):null}
        </form>
      </div>
    </div>
  );
}
