import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/TeamsLogo.png";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form");
  };

  const handleChange = (e) => {};
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
            name="Email"
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

          <button type="submit">Create user</button>

          <span>
            Already have an account ?? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
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
      &: hover{
        background-color:black;
      }
    }
    span{
        color:black;
        text-transform:uppercase;
        a {
            color:#5558ae;
            text-decoration:none;
            font-weight:bold
            
        }
    }
  }
`;

export default Register;
