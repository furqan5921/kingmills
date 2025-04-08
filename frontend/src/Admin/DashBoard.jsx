import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SidebarComponent from "./Sidbar";

const DashBoard = () => {

    return (
        <Container>
            <SidebarComponent />
            <Content>
                <Header>
                    <h1> DashBoard</h1>

                </Header>
            </Content>
        </Container>
    );
};

// 📌 Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #121212;
`;
const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  h1 {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export default DashBoard;