import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/TeamsLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { registerRoute, setAvatarRoute } from "../utils/routes";
import loader from '../assets/loader.gif'

export default function SetAvatar() {
    const navigate = useNavigate()
    const api = 'https://api.multiavatar.com/45678945'
    const [avatars, setAvatars] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    const toastStyle = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "light",
      };

    const getAvatar = async ()=>{
        let res = await axios.get(api)
        console.log('get avatar :', res.data)
        setAvatars(res.data)
    }

    useEffect(()=>{
getAvatar()
    },[])


  return (<>
    <Container>
<div className='title-container'>
    <h1>
        Pick an avatar as your profile pic
    </h1>
    </div>

    <div className='avatars'>
        {

        }
    </div>



    </Container>
<img src={avatars}/>
<ToastContainer/>  
  </>
  )
}


const Container = styled.div`

`