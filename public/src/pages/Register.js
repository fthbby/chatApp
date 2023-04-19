import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/TeamsLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { registerRoute } from "../utils/routes";


function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    console.log("VALUES :", values);
  }, [values]);

  const toastStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "light",
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      console.log('in validation', registerRoute)
      const { password, username, email } = values;

      const {data} = await axios.post(registerRoute,
        {        username,
        email,
        password}

        )

        if (data.status === false ){
          toast.error(data.msg, toastStyle)
        }
        if (data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          navigate('/')

        }

    };

  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("PW & CF should be da same", toastStyle);
      return false;
    } else if (username.length < 3) {
      toast.error("Username shoudl be longer than 3 characters", toastStyle);
      return false;
    } else if (password.length < 5) {
      toast.error("password shoudl be longer than 5 characters", toastStyle);
      return false;
    } else if (email === "") {
      toast.error("email can't be blank", toastStyle);
      return false
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>TeamsCLONE</h1>
          </div>

          <input
            type="text"
            placeholder="UserName"
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account ?? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #5558ae;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f0f0f0;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #5558ae;
      border-radius: 0.4rem;

      &:focus: {
        border: 1 rem solid red;
        ${"" /* outline:none */}
      }
    }
    button {
      background-color: #5558ae;
      height: 50px;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      font-weight: 600;
      color: white;
      transition: 0.5s ease-in-out;
      &: hover {
        background-color: black;
      }
    }
    span {
      color: black;
      text-transform: uppercase;
      a {
        color: #5558ae;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
