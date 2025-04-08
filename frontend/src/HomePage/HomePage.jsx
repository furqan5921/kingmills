import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import Navbar from "../components/Navbar"; // Import Navbar

const HomePage = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/color"); // Ensure navigation works
  };

  return (
    <HomePageWrapper>
      <Navbar /> {/* Add Navbar */}
      {/* <Header>
        <Logo>🎮 KingMalls</Logo>
        <LogoutButton
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </LogoutButton>
      </Header> */}
      <MainContent>
        <Heading>Welcome to the Ultimate Color Prediction Game</Heading>
        <SubHeading>Test your luck and win exciting rewards!</SubHeading>
        <GameImage
          src="https://img.freepik.com/free-photo/online-soccer-game-bet-technology_53876-123941.jpg?t=st=1744021002~exp=1744024602~hmac=2de4d325d87628d35f27c8bc477df9296c48c21a3ee50f757ad477025c6534cf&w=2000"
          alt="Game Thumbnail"
          onClick={handleImageClick} // Use the handleImageClick function
        />
        <PlayButton onClick={() => navigate("/color")}>Play Now</PlayButton>
      </MainContent>
      <Footer>
        <FooterText>© 2023 KingMalls. All rights reserved.</FooterText>
      </Footer>
    </HomePageWrapper>
  );
};

export default HomePage;

// Styled components
const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background: linear-gradient(to bottom, #0b66ff, #0057d9);
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e60000;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const GameImage = styled.img`
  width: 400px;
  height: 250px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const PlayButton = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005ce6;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FooterText = styled.p`
  font-size: 0.9rem;
`;
