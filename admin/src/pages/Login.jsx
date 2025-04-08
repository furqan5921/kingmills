import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission

    try {
      const response = await axios.post(
        `https://color-prediction-api.vercel.app/api/admin/login`,
        formData
      );

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.user));

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <h2>Admin Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <LoginButton type="submit">Login</LoginButton>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
`;

const LoginBox = styled.div`
  background: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 300px;
  color: white;

  h2 {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background: #2a2a2a;
  color: white;
  font-size: 16px;
  outline: none;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #4500b5;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 14px;
  margin-bottom: 10px;
`;

export default AdminLogin;
