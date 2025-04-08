import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import SidebarComponent from "./Sidbar";
import Swal from "sweetalert2";
const Container = styled.div`

  height: 100vh;
  background-color: #121212;
  color: white;
`;

const Sidebar = styled.div`
  background: #1e1e1e;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
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


const TableContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  background: #1a1a1a;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #333;
  padding: 10px;
  border: 1px solid #444;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #444;
  text-align: center;
`;

const Button = styled.button`
  background: #6200ea;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background: #3700b3;
  }
`;

const DeleteButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #b71c1c;
  }
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
  z-index: 1000;
`;

const AdminRandomNumbers = () => {
    // console.log(process.env.REACT_APP_API_URL)
      const API_Url = "https://color-prediction-api.vercel.app"
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [roundId, setRoundId] = useState("");
    const [randomNumber, setRandomNumber] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_Url}/api/color/get-random-color`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleAdd = async () => {
        try {
            await axios.post(`${API_Url}/api/color/select-random-color`, { roundId, randomNumber });
            fetchData();
            setShowModal(false);
        } catch (error) {
            console.error("Error adding number", error);
        }
    };

    const handleDelete = async (roundId) => {
        try {
            const swalResult = await Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this random number!",
                icon: "warning",
                buttons: true,
               
                showCancelButton: true,
                dangerMode: true,
                background: "#1e1e1e",
                confirmButtonColor: "#6200ea",
                cancelButtonColor: "#d32f2f",
                confirmButtonText: "Yes, delete it!"
            });
            if (swalResult.isConfirmed) {
                await axios.delete(`${API_Url}/api/color/delete-random-color/${roundId}`);
                fetchData(); // Refresh data after deletion
                await Swal.fire({
                    title: "Deleted!",
                    text: "Random number has been deleted.",
                    icon: "success",
                    background: "#1e1e1e",
                    confirmButtonColor: "#6200ea",
                });
            }
        } catch (error) {
            console.error("Error deleting number", error);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
            {/* Sidebar */}
            {/* <SidebarComponent /> */}

            {/* Main Content */}
            <div style={{ flex: 1, padding: "20px", overflowY: "auto", color: "#fff" }}>
                <Container>
                    <Sidebar>
                        <h2>Add Random Number</h2>
                        <Button onClick={() => setShowModal(true)}>Add Random Number</Button>
                    </Sidebar>

                    <Content>
                        <h2>Random Numbers</h2>
                        <TableContainer>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>Round ID</Th>
                                        <Th>Random Number</Th>
                                        <Th>Actions</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.roundId}>
                                            <Td>{item.roundId}</Td>
                                            <Td>{item.randomNumber}</Td>
                                            <Td>
                                                <DeleteButton onClick={() => handleDelete(item.roundId)}>Delete</DeleteButton>
                                            </Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </Content>

                    {showModal && (
                        <Modal style={{ width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
                            <h3 style={{ marginBottom: "10px" }}>Add Random Number</h3>

                            <label style={{ display: "block", marginBottom: "5px" }}>Round ID:</label>
                            <input
                                type="text"
                                placeholder="Round ID"
                                value={roundId}
                                onChange={(e) => setRoundId(e.target.value)}
                                style={{ padding: "8px", margin: "5px 0", width: "100%", color: "black" }}
                            />
                            <label style={{ display: "block", marginBottom: "5px" }}>Random Number:</label>
                            <input
                                type="text"
                                placeholder="Random Number"
                                value={randomNumber}
                                onChange={(e) => setRandomNumber(e.target.value)}
                                style={{ padding: "8px", margin: "5px 0", width: "100%", color: "black" }}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                <Button style={{ marginRight: "10px" }} onClick={handleAdd}>Submit</Button>
                                <Button onClick={() => setShowModal(false)}>Close</Button>
                            </div>
                        </Modal>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default AdminRandomNumbers;
