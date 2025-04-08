import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
// import SidebarComponent from "./Sidbar";


const AdminReferralCodes = () => {
 const API_Url = "https://color-prediction-api.vercel.app"
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [referalCode, setReferalCode] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_Url}/api/color/get-referal-code`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching referral codes", error);
        }
    };

    const handleAdd = async () => {
        if (!referalCode.trim()) {
            Swal.fire("Error", "Referral code cannot be empty!", "error");
            return;
        }

        try {
            await axios.post(`${API_Url}/api/color/add-referal-code`, { referalCode });
            fetchData();
            setShowModal(false);
            setReferalCode("");
            Swal.fire("Success", "Referral Id added!", "success");
        } catch (error) {
            console.error("Error adding referral Id", error);
        }
    };

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this referral code!",
            icon: "warning",
            showCancelButton: true,
            dangerMode: true,
            background: "#1e1e1e",
            confirmButtonColor: "#6200ea",
            cancelButtonColor: "#d32f2f",
            confirmButtonText: "Yes, delete it!"
        });

        if (swalResult.isConfirmed) {
            try {
                await axios.delete(`${API_Url}/api/color/delete-referal-code/${id}`);
                fetchData();
                Swal.fire(
                    {
                        dangerMode: true,
                        background: "#1e1e1e",
                        text: "You will not be able to recover this referral code!",
                    })
                // "Deleted!", "Referral code has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting referral code", error);
            }
        }
    };

    return (
        <Container>
            {/* Sidebar */}
            {/* <SidebarComponent /> */}

            {/* Main Content */}
            <Content>
                <AboveContainer >
                    <h2>Referral Ids</h2>
                    <Button onClick={() => setShowModal(true)}>Add Referral Id</Button>
                </AboveContainer>


                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Referral Id</Th>
                                <Th>Created At</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr key={item._id}>
                                        <Td>{item.referalCode}</Td>
                                        <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                                        <Td>
                                            <DeleteButton onClick={() => handleDelete(item._id)}>Delete</DeleteButton>
                                        </Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Td colSpan="3">No referral Ids found.</Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </TableContainer>

                {/* Modal for Adding Referral Code */}
                {showModal && (
                    <Modal style={{ width: "400px", padding: "20px", borderRadius: "10px" }}>
                        <h3>Add Referral Code</h3>

                        <label style={{ display: "block", marginBottom: "5px" }}>Referral Code:</label>
                        <input
                            type="text"
                            placeholder="Enter referral code"
                            value={referalCode}
                            onChange={(e) => setReferalCode(e.target.value)}
                            style={{ padding: "8px", margin: "5px 0", width: "100%", color: "black" }}
                        />

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                            <Button style={{ marginRight: "10px" }} onClick={handleAdd}>Submit</Button>
                            <Button onClick={() => setShowModal(false)}>Close</Button>
                        </div>
                    </Modal>
                )}
            </Content>
        </Container>
    );
};

export default AdminReferralCodes;


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
  transition: 0.3s;

  &:hover {
    background: #3700b3;
  }
`;

const DeleteButton = styled(Button)`
  background: #d32f2f;
  
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

const AboveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding :0 30px;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
