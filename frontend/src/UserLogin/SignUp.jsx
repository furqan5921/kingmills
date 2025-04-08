import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../baseURL";

const RegistrationPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [referalId, setReferalId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;
    const isUsernameValid = username.trim().length > 0;

    setIsFormValid(isEmailValid && isPasswordValid && isUsernameValid);
  }, [username, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post("/api/signup", {
        username,
        email,
        password,
        referalId,
      });

      if (response.status === 201) {
        setSuccess("User registered successfully!");
        navigate("/login");
      } else {
        setError(response.data.message || "Failed to register user");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpWrapper>
      <FormContainer onSubmit={handleSubmit}>
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
        <Heading>Create a new Account</Heading>
        <Input
          type="text"
          placeholder="Enter Referal ID"
          value={referalId}
          onChange={(e) => setReferalId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={!isFormValid || loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        {error && <Message>{error}</Message>}
        {success && <Message success>{success}</Message>}
        <FooterText>
          Already have an account? <Link to="/login">Login</Link>
        </FooterText>
      </FormContainer>
    </SignUpWrapper>
  );
};

export default RegistrationPage;

// Styled components
const SignUpWrapper = styled.div`
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
  color: ${(props) => (props.success ? "green" : "red")};
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
