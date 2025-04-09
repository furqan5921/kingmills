import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../baseURL";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axiosInstance.post("/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
        setMessage(`Welcome, ${response.data.user.username}!`);
        navigate("/");
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <FormContainer onSubmit={handleLogin}>
        <LogoWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="80"
            height="80"
          >
            <circle cx="50" cy="50" r="48" fill="#007bff" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="white"
              fontSize="18"
              fontWeight="bold"
              dy=".3em"
            >
              KingMalls
            </text>
          </svg>
        </LogoWrapper>
        <Heading>Login to Your Account</Heading>
        <Input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        {message && <Message>{message}</Message>}
        <FooterText>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </FooterText>
      </FormContainer>
    </LoginWrapper>
  );
};

export default Login;

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #0b66ff, #0057d9);
`;

const FormContainer = styled.form`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0b66ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005ce6;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: ${(props) => (props.children.includes("Error") ? "red" : "green")};
`;

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
