import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import './home.css';
import {AuthContext} from '../../context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

export default function Home() {
  const {user} = useContext(AuthContext); 
  //const {user, setUser} = useState({});
  // useEffect(() => {
  //   const getUser = async () => {
  //       try {
  //             const res = await axios.post("/users?userId="+user._id);
  //             setUser(res.data);
  //             localStorage.setItem('user', JSON.stringify(res.data));
  //         } catch(error) {
  //             console.log(error);      
  //         }

  //   }
  //   getUser();
  // }, []);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
