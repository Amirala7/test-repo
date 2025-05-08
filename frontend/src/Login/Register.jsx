import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/images/play.gif";
import { userRepository } from '../repositories/userRepository';

const PixelBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  fontFamily: '"Press Start 2P", cursive',
  position: "relative",
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: "400px",
  width: "90%",
  backgroundColor: "rgba(30, 30, 46, 0.85)",
  borderRadius: "20px",
  border: "2px solid #4a4e69",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const FormTitle = styled(Box)(({ theme }) => ({
  color: "#fff",
  fontSize: "28px",
  marginBottom: "20px",
  textAlign: "center",
  textShadow: "0 0 10px rgba(0, 217, 255, 0.7)",
}));

const StyledInput = styled('input')(({ theme }) => ({
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  backgroundColor: "rgba(44, 44, 84, 0.6)",
  border: "2px solid #4a4e69",
  borderRadius: "10px",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.3s",
  "&:focus": {
    borderColor: "#00d9ff",
    boxShadow: "0 0 8px rgba(0, 217, 255, 0.5)",
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "10px",
}));

const PixelButton = styled('button')(({ theme, variant }) => ({
  display: "inline-block",
  backgroundColor: variant === "register" ? "#2c2c54" : "#40407a",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "14px",
  padding: "12px 20px",
  border: `3px solid ${variant === "register" ? "#00d9ff" : "#ffcc00"}`,
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: variant === "register" ? "#40407a" : "#4a4e69",
    borderColor: variant === "register" ? "#00aaff" : "#ffaa00",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const ErrorMessage = styled(Box)(({ theme }) => ({
  color: "#ff6b6b",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "12px",
  marginTop: "15px",
  textAlign: "center",
  textShadow: "0 0 5px rgba(255, 107, 107, 0.7)",
}));

const SuccessMessage = styled(Box)(({ theme }) => ({
  color: "#6bff6b",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "12px",
  marginTop: "15px",
  textAlign: "center",
  textShadow: "0 0 5px rgba(107, 255, 107, 0.7)",
}));

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userRepository.register(formData.username, formData.password);
      setMessage(response.message);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.message || 'Error registering');
      setIsSuccess(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <PixelBox>
      <FormContainer>
        <FormTitle>Register</FormTitle>
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <InputContainer>
            <StyledInput
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <StyledInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </InputContainer>
          <ButtonContainer>
            <PixelButton type="submit" variant="register">
              Register
            </PixelButton>
            <PixelButton type="button" variant="login" onClick={handleLoginRedirect}>
              Back to Login
            </PixelButton>
          </ButtonContainer>
          {message && (
            isSuccess ? 
            <SuccessMessage>{message}</SuccessMessage> : 
            <ErrorMessage>{message}</ErrorMessage>
          )}
        </form>
      </FormContainer>
    </PixelBox>
  );
};

export default Register;