import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SidebarComponent from "./Sidbar";

const GetBetData = () => {
   const Api_url = "https://color-prediction-api.vercel.app"
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    walletBalance: "",
    selectedNumber: "",
    newRoundId: "",
    user: "",
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${Api_url}/api/color/history-all`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/placeBet", formData);
      fetchHistory();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.delete(`${Api_url}/api/color/reset-game`);
      fetchHistory();
    } catch (error) {
      console.error("Error resetting matches:", error);
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <Content>
        <Header>
          <h1>Admin Panel</h1>
          <ButtonContainer>
            <Button onClick={() => setIsModalOpen(true)}>Add Bet</Button>
            <ResetButton onClick={handleReset}>Reset All</ResetButton>
          </ButtonContainer>
        </Header>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Referal Id</Th>
                <Th>Round ID</Th>
                <Th>Amount</Th>
                <Th>Predicted</Th>
                <Th>Result</Th>
                <Th>Win Amount</Th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <Td>{record.referalId}</Td>
                  <Td>{record.roundId}</Td>
                  <Td>₹{record.betAmout}</Td>
                  <Td>{record.predictedColor}</Td>
                  <Td>{record.resultColor || "Pending"}</Td>
                  <Td>₹{record.winAmt}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {isModalOpen && (
          <Modal>
            <form onSubmit={handleSubmit}>
              <h2>Add Bet</h2>
              <Input name="amount" placeholder="Amount" onChange={handleInputChange} required />
              <Input name="walletBalance" placeholder="Wallet Balance" onChange={handleInputChange} required />
              <Input name="selectedNumber" placeholder="Predicted Number" onChange={handleInputChange} required />
              <Input name="newRoundId" placeholder="Round ID" onChange={handleInputChange} required />
              <Input name="user" placeholder="User ID" onChange={handleInputChange} required />
              <ButtonContainer>
                <Button type="submit">Submit</Button>
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </ButtonContainer>
            </form>
          </Modal>
        )}
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding:20px ;
`;

const Button = styled.button`
  background: #6200ea;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 1rem;

  &:hover {
    background: #3700b3;
  }
`;

const ResetButton = styled(Button)`
  background: #d32f2f;

  &:hover {
    background: #b71c1c;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  max-height: 70vh;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  background: #1a1a1a;

  @media (max-width: 600px) {
    overflow-x: scroll;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Th = styled.th`
  background: #333;
  padding: 10px;
  border: 1px solid #444;
  text-align: center;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #444;
  text-align: center;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  width: 90%;
  max-width: 400px;
  z-index: 1000;

  @media (max-width: 480px) {
    width: 95%;
    padding: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #444;
  background: #1e1e1e;
  color: white;
`;

export default GetBetData;
