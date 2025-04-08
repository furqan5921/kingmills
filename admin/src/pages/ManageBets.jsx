import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const GetBetData = () => {
    const API_Url = "https://color-prediction-api.vercel.app";
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [filterReferalId, setFilterReferalId] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        setFilteredHistory(
            history.filter(record =>
                String(record?.referalId || "").toLowerCase().includes(filterReferalId.toLowerCase())
            )
        );
    }, [filterReferalId, history]);



    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${API_Url}/api/color/history-all`);
            console.log("API Response:", response.data); // Debugging step
            setHistory(response.data);
            setFilteredHistory(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };


    const handleReset = async () => {
        try {
            await axios.delete(`${API_Url}/api/color/reset-game`);
            fetchHistory();
        } catch (error) {
            console.error("Error resetting matches:", error);
        }
    };

    return (
        <Container>
            <Content>
                <Header>
                    <h1>Admin Panel</h1>
                    <FilterInput
                        type="text"
                        placeholder="Filter by Referral ID"
                        value={filterReferalId}
                        onChange={(e) => setFilterReferalId(e.target.value)}
                    />
                    <ButtonContainer>
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
                            {filteredHistory.map((record) => (
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
            </Content>
        </Container>
    );
};

// 📌 Styled Components
const Container = styled.div`
  height: 100vh;
  background-color: #121212;
  color: white;
`;

const Content = styled.div`
  width: 80%;
  flex: 1;
  padding: 20px;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
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

const FilterInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background: #1e1e1e;
  color: white;
  outline: none;
  width: 250px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 20px;
`;

const ResetButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 1rem;

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

export default GetBetData;
