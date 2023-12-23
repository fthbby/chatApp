import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/TeamsLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../../api/routes";
import Loading from "../../components/Loading";
import { Box, FormControl, Typography } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    // username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const toastStyle = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "light",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      console.log("in validation", loginRoute);
      const { password, email } = values;

      const { data } = await axios.post(loginRoute, { email, password });

      if (data.status === false) {
        setLoading(false);
        toast.error(data.msg, toastStyle);
      }
      if (data.status === true) {
        setLoading(false);

        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username, email } = values;
    if (email.length === "" || password.length === "") {
      toast.error("Email & PW is required", toastStyle);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        {loading ? (
          <Loading />
        ) : (
          <FormControl
            onSubmit={(event) => handleSubmit(event)}
            display="flex"
            flexDirection="column"
            gap={"2rem"}
            padding={"3rem 5rem"}
            backgroundColor='#f0f0f0'
            sx={{borderRadius:'2rem'}}
     
          >
            <Box
              className="brand"
              display="flex"
              alignItems={"center"}
              gap={"1rem"}
              justifyContent={"center"}
            >
              <Box component="img" height={"5rem"} src={Logo} alt="" />
              <Typography variant="h1" textTransform={"uppercase"}>
                TeamsCLONE
              </Typography>
            </Box>

            <input
              type="text"
              placeholder="email"
              name="email"
              min="3"
              onChange={(e) => handleChange(e)}
            />

            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />

            <button type="submit">Login</button>

            <span>
              Don't have an account?? <Link to="/register">Register</Link>
            </span>
          </FormControl>
        )}
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

export default Login;
