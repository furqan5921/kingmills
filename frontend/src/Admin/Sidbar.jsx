import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaTachometerAlt, FaGamepad, FaRandom } from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 300px;
  background-color: #1e1e1e;
  height: 100vh;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  padding: 12px;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 16px;
  
  &:hover {
    background-color: #333;
    transform: translateX(5px);
  }

  ${({ active }) => active && `
    background-color: #444;
    font-weight: bold;
  `}
`;

const SidebarComponent = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <SidebarHeader>Admin Panel</SidebarHeader>
      <NavList>
        <NavItem>
          <SidebarLink to="/admin/dashboard" active={location.pathname === "/admin/dashboard"}>
            <FaTachometerAlt /> Dashboard
          </SidebarLink>
        </NavItem>
        <NavItem>
          <SidebarLink to="/admin/manage-bets" active={location.pathname === "/admin/manage-bets"}>
            <FaGamepad /> Manage Bets
          </SidebarLink>
        </NavItem>
        <NavItem>
          <SidebarLink to="/admin/random-numbers" active={location.pathname === "/admin/random-numbers"}>
            <FaRandom /> Random Numbers
          </SidebarLink>
        </NavItem>
        <NavItem>
          <SidebarLink to="/admin/refaral-codes" active={location.pathname === "/admin/refaral-codes"}>
            <FaRandom /> Raferal Code
          </SidebarLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default SidebarComponent;
