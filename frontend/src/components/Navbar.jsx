import React, { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { useProfile } from "../context/ProfileContext";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "withdraw" or "deposit"
  const [copySuccess, setCopySuccess] = useState(""); // State for copy feedback
  const [formData, setFormData] = useState({
    username: "",
    upiId: "",
    mobile: "",
    amount: "",
  }); // State for form data
  const { profile } = useProfile();

  const handleWithdraw = () => {
    setModalType("withdraw");
    setIsModalOpen(true);
  };

  const handleDeposit = () => {
    setModalType("deposit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setFormData({ username: "", upiId: "", mobile: "", amount: "" }); // Reset form data
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "9516222196"; // WhatsApp number to redirect
    const message =
      modalType === "withdraw"
        ? `Withdrawal Request:\n\nUsername: ${formData.username}\nUPI ID: ${formData.upiId}\nPhone Number: ${formData.mobile}\nAmount: ₹${formData.amount}`
        : `Deposit Request:\n\nUsername: ${formData.username}\nMobile: ${formData.mobile}\nDeposit Amount: ₹${formData.amount}\nUTR No: ${formData.utr}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank"); // Redirect to WhatsApp
    closeModal();
  };

  return (
    <>
      <NavbarWrapper>
        <Link to={"/"}>
          <Logo>🎮 KingMalls</Logo>
        </Link>
        <WalletSection>
          <WalletBalance>Balance: ₹{profile.walletBalance}</WalletBalance>
          <WalletButton onClick={handleWithdraw}>Withdraw</WalletButton>
          <WalletButton onClick={handleDeposit}>Deposit</WalletButton>
        </WalletSection>
      </NavbarWrapper>

      {isModalOpen && modalType === "withdraw" && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Withdrawal Request</h2>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="upiId">UPI ID:</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="Enter UPI ID"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="mobile">Phone Number:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="amount">Amount (₹):</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Proceed To Withdraw</SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {isModalOpen && modalType === "deposit" && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Deposit Request</h2>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <DepositInfo>
                <p>
                  <strong>UPI Handle:</strong> aashutoahjain0@ybl{" "}
                  <CopyButton
                    type="button"
                    onClick={() => handleCopy("aashutoahjain0@ybl")}
                  >
                    📋
                  </CopyButton>
                </p>
                <p>
                  <strong>PhonePay/Paytm:</strong> 9752836655{" "}
                  <CopyButton
                    type="button"
                    onClick={() => handleCopy("9752836655")}
                  >
                    📋
                  </CopyButton>
                </p>
                {copySuccess && <CopyMessage>{copySuccess}</CopyMessage>}
                <QRCode>
                  <strong>QR Code:</strong>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="QR Code"
                    width="150"
                    height="150"
                  />
                </QRCode>
              </DepositInfo>
              <FormGroup>
                <label htmlFor="username">UserName:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="mobile">Mobile No:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="amount">Deposit:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="utr">UTR NO:</label>
                <input
                  type="text"
                  id="utr"
                  name="utr"
                  value={formData.utr}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Note>
                A screenshot must be sent on WhatsApp to verify the payment.
              </Note>
              <SubmitButton type="submit">Proceed To Deposit</SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Navbar;

// Styled components
const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #ff7e5f, #feb47b); /* Vibrant gradient */
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a shadow for a glowing effect */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const WalletBalance = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Add a shadow for better visibility */

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const WalletButton = styled.button`
  background: linear-gradient(90deg, #6a11cb, #2575fc); /* Vibrant gradient */
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1); /* Slightly enlarge on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add a shadow on hover */
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a2e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: #ff7e5f;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const DepositInfo = styled.div`
  text-align: left;
  margin-bottom: 20px;

  p {
    margin: 10px 0;
  }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const QRCode = styled.div`
  margin: 10px 0;

  img {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #ccc;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #2a2a3e;
    color: white;
  }

  input::placeholder {
    color: #888;
  }
`;

const Note = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background: linear-gradient(to right, #ff6a3d, #fd9a5e);
  }
`;

const CopyMessage = styled.span`
  display: block;
  margin-top: 10px;
  color: #28a745;
  font-size: 0.9rem;
  font-weight: bold;
`;
