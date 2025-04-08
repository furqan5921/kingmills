import { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import Socket.IO client
import axiosInstance from "../baseURL";
import Navbar from "../components/Navbar";
import { useProfile } from "../context/ProfileContext";
import "./Color.css";

const socket = io("http://localhost:8080"); // Connect to the backend server

const Color = () => {
  const { profile, fetchNameWallet } = useProfile();

  const [selectedNumber, setSelectedNumber] = useState(
    () => sessionStorage.getItem("selectedNumber") || null
  );
  const [betAmount, setBetAmount] = useState(
    () => sessionStorage.getItem("betAmount") || 0
  );
  const [roundId, setRoundId] = useState(`R${new Date().getTime()}`);
  const [timerDuration, setTimerDuration] = useState(180);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState({ status: "", message: "" });
  const [walletBalance, setWalletBalance] = useState(profile.walletBalance);
  const [colorResult, setColorResult] = useState("");
  const [historyById, setHistoryByd] = useState([]);
  const [isBettingOpen, setIsBettingOpen] = useState(true);
  const [timer_thirty, setTimerThirty] = useState(false); // Initialize timer_thirty with a default value

  useEffect(() => {
    fetchNameWallet();
    fetchGameHistory();

    // Listen for timer updates from the server
    socket.on("timerUpdate", (data) => {
      setTimeLeft(data.timeLeft); // Update the timer state
      setRoundId(data.roundId); // Update the round ID
    });

    // Listen for the new round event
    socket.on("newRound", (data) => {
      setRoundId(data.roundId); // Update the round ID
      setTimeLeft(data.timeLeft); // Reset the timer for the new round
      setIsBettingOpen(true); // Reopen bets for the new round
    });

    // Listen for the timer ended event
    socket.on("timerEnded", (data) => {
      setIsBettingOpen(false); // Lock bets when the timer ends
    });

    // Listen for game results from the server
    socket.on("gameResult", (data) => {
      if (data.randomResult !== null) {
        setColorResult(data.randomResult);
        setResult({
          status: data.randomResult === selectedNumber ? "won" : "lost",
          message:
            data.randomResult === selectedNumber
              ? `You won ₹${(betAmount * 1.98).toFixed(2)}! Winning result: ${
                  data.randomResult
                }`
              : `You lost ₹${betAmount}! Winning result: ${data.randomResult}`,
        });
      } else {
        setResult({
          status: "error",
          message: data.message || "No results available for this round.",
        });
      }
      setShowResultModal(true);
      setTimeout(() => setShowResultModal(false), 2000);
    });

    return () => {
      socket.off("timerUpdate");
      socket.off("newRound");
      socket.off("timerEnded");
      socket.off("gameResult");
    };
  }, []);

  const generateRandomResult = () => {
    const colors = ["green", "violet", "red"];
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1); // Numbers 1 to 9
    const allResults = [...colors, ...numbers]; // Combine colors and numbers
    const randomIndex = Math.floor(Math.random() * allResults.length); // Random index
    return allResults[randomIndex]; // Return a random result
  };

  const handleGameEnd = async () => {
    try {
      setIsBettingOpen(false); // Lock bets after the timer ends

      // Emit a request to process the result on the server
      socket.emit("processResult", { roundId });

      // Listen for the game result from the server
      socket.on("gameResult", (data) => {
        setColorResult(data.randomResult);
        setResult({
          status: data.randomResult === selectedNumber ? "won" : "lost",
          message:
            data.randomResult === selectedNumber
              ? `You won ₹${(betAmount * 1.98).toFixed(2)}! Winning result: ${
                  data.randomResult
                }`
              : `You lost ₹${betAmount}! Winning result: ${data.randomResult}`,
        });
        setShowResultModal(true);
        setTimeout(() => setShowResultModal(false), 2000);

        // Start a new round after results are processed
        const newRoundId = `R${Date.now().toString()}`;
        setRoundId(newRoundId);
        localStorage.setItem("roundId", newRoundId);
        setIsBettingOpen(true); // Reopen bets for the new round
        setTimeLeft(timerDuration); // Reset the timer
      });

      fetchGameHistory(); // Refresh game history
    } catch (error) {
      console.error("Error processing game end:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      localStorage.removeItem("prevRoundId");
      const response = await axiosInstance.get("/api/color/get-lastRoundId");
      localStorage.setItem("prevRoundId", response.data.roundId);
      setPrevRoundId(response.data.roundId);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    sessionStorage.setItem("selectedNumber", selectedNumber);
    sessionStorage.setItem("betAmount", betAmount);
  }, [selectedNumber, betAmount]);

  useEffect(() => {
    fetchNameWallet();
  }, [profile]);

  useEffect(() => {
    fetchNameWallet(); // Ensure wallet balance is fetched
  }, []);

  const toggleTimer = (timer) => {
    setTimerDuration(timer); // Set the new timer duration
    setTimeLeft(timer); // Reset timeLeft immediately
    setTimerThirty(timer === 30); // Update timer_thirty based on the timer value
    const newRoundId = `R${Date.now().toString()}`;
    setRoundId(newRoundId);
    localStorage.setItem("roundId", newRoundId);
  };

  const fetchRandomNumber = async () => {
    try {
      const { data } = await axiosInstance.get("/api/color/get-lastRoundId");
      localStorage.setItem("colorResult", data.randomNumber);
      setColorResult(data.randomNumber);
    } catch (error) {
      console.error("Error fetching random number", error);
    }
  };
  useEffect(() => {
    fetchRandomNumber();
  }, []);
  const fetchGameHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axiosInstance.get(`/api/color/history/${user.id}`);
      setHistoryByd(data);
    } catch (error) {
      console.error("Error fetching game history", error);
    }
  };

  const numbers = Array.from({ length: 10 }, (_, i) => ({
    number: i,
    color: i === 0 || i === 5 ? "violet" : i % 2 === 0 ? "red" : "green",
  }));

  const handleNumberSelect = (number) => {
    if (!isBettingOpen) return;
    setSelectedNumber(number);
    setShowBetModal(true);
  };

  const handleBetAmountSelect = (amount) => {
    setBetAmount(amount);
  };

  const placeBet = async () => {
    if (betAmount <= 0) {
      setResult({ status: "error", message: "Please select a bet amount!" });
      setShowResultModal(true);
      return;
    }
    if (betAmount > profile.walletBalance) {
      setResult({ status: "error", message: "Insufficient balance!" });
      setShowResultModal(true);
      return;
    }
    try {
      const payload = {
        amount: betAmount,
        walletBalance: profile.walletBalance,
        selectedNumber,
        newRoundId: roundId,
        user: profile.userId,
        referalId: profile.referalId,
      };

      const { data } = await axiosInstance.post(
        "/api/color/place-bet",
        payload
      );

      if (data.success) {
        setWalletBalance((prev) => prev - betAmount);
        setShowBetModal(false);
        setIsBettingOpen(true);
        localStorage.setItem("selectedNumber", selectedNumber);
        localStorage.setItem("betAmount", betAmount);
        localStorage.setItem("roundId", roundId);

        setResult({
          status: "success",
          message: `Bet Placed: ₹${betAmount} on ${selectedNumber}`,
        });
        setShowResultModal(true);
        setTimeout(() => setShowResultModal(false), 2000);

        // Emit the bet placement event to other clients
        socket.emit("betPlaced", {
          userId: profile.userId,
          roundId,
          betAmount,
          selectedNumber,
        });
      } else {
        setResult({ status: "error", message: data.message });
        setShowResultModal(true);
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      setResult({ status: "error", message: "Failed to place bet" });
      setShowResultModal(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <h1 className="title">Color Prediction</h1>
        </div>
        <div className="main-content">
          <div className="game-section">
            <div className="game-card">
              <div className="text-lg font-semibold flex justify-between period-header">
                <span>
                  🏆 Period {roundId || localStorage.getItem("roundId")}
                </span>
              </div>
              <div className="timer">
                <div className="timer-label">Time Remaining</div>
                <div className="timer-value">
                  {Math.floor(timeLeft / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(timeLeft % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="color-buttons">
                <button
                  disabled={
                    !isBettingOpen ||
                    (timer_thirty && timeLeft <= 10) ||
                    (!timer_thirty && timeLeft <= 30)
                  }
                  className={`color-btn green-btn  ${
                    !isBettingOpen ||
                    (timer_thirty && timeLeft <= 10) ||
                    (!timer_thirty && timeLeft <= 30)
                      ? "disabled cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleNumberSelect("green")}
                >
                  Green
                </button>

                <button
                  disabled={
                    !isBettingOpen ||
                    (timer_thirty && timeLeft <= 10) ||
                    (!timer_thirty && timeLeft <= 30)
                  }
                  className={`color-btn violet-btn ${
                    !isBettingOpen ||
                    (timer_thirty && timeLeft <= 10) ||
                    (!timer_thirty && timeLeft <= 30)
                      ? "disabled cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleNumberSelect("violet")}
                >
                  Violet
                </button>

                <button
                  disabled={
                    !isBettingOpen ||
                    (timer_thirty && timeLeft <= 10) ||
                    (!timer_thirty && timeLeft <= 30)
                  }
                  className={`color-btn red-btn  ${
                    !isBettingOpen ||
                    (timer_thirty && timeLeft <= 10) ||
                    (!timer_thirty && timeLeft <= 30)
                      ? "disabled cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleNumberSelect("red")}
                >
                  Red
                </button>
              </div>

              <div className="number-grid">
                {numbers.map(({ number, color }) => (
                  <button
                    key={number}
                    className={`number-btn ${color}-number ${
                      (!isBettingOpen ||
                        (timer_thirty && timeLeft <= 10) ||
                        (!timer_thirty && timeLeft <= 30)) &&
                      "disabled"
                    }  ${
                      !isBettingOpen ||
                      (timer_thirty && timeLeft <= 10) ||
                      (!timer_thirty && timeLeft <= 30)
                        ? ""
                        : "shining-effect"
                    } `}
                    disabled={!isBettingOpen || timeLeft <= 10}
                    onClick={() => handleNumberSelect(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="history-section">
            <h2 className="history-title">Game History</h2>
            <div className="history-table-container">
              <div
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  scrollbarColor: "#00b4d8 #90e0ef",
                  scrollbarWidth: "none",
                }}
              >
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Price</th>
                      <th>Number</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyById &&
                      historyById.map((record, index) => (
                        <tr key={record.roundId || index}>
                          <td>{index + 1}</td>
                          <td>₹{record.betAmout}</td>
                          <td>
                            {record.predictedColor ? (
                              <div
                                className="result-dot"
                                style={{
                                  backgroundColor: record.predictedColor,
                                }}
                              >
                                {record.predictedColor >= 0 &&
                                record.predictedColor <= 10
                                  ? record.predictedColor
                                  : ""}
                              </div>
                            ) : (
                              <div>{record.predictedColor}</div>
                            )}
                          </td>
                          <td>
                            {record.resultColor ? (
                              <div
                                className="result-dot"
                                style={{ backgroundColor: record.resultColor }}
                              >
                                {record.resultColor >= 0 &&
                                record.resultColor <= 10
                                  ? record.resultColor
                                  : ""}
                              </div>
                            ) : (
                              <div>{record.resultColor}</div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showBetModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Place Your Bet</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowBetModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="bet-options">
                  <h4>Quick Amounts</h4>
                  <div className="amount-buttons">
                    {[10, 50, 100, 500].map((amount) => (
                      <button
                        key={amount}
                        className={`amount-btn ${
                          betAmount === amount ? "selected" : ""
                        }`}
                        onClick={() => handleBetAmountSelect(amount)}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="multiplier-options">
                  <h4>Multipliers</h4>
                  <div className="multiplier-buttons">
                    {[2, 5, 10].map((multiplier) => (
                      <button
                        key={multiplier}
                        className="multiplier-btn"
                        onClick={() =>
                          betAmount > 0 &&
                          handleBetAmountSelect(betAmount * multiplier)
                        }
                      >
                        x{multiplier}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bet-confirm">
                  <p>Selected Amount: ₹{betAmount}</p>
                  <button className="place-bet-btn" onClick={placeBet}>
                    Place Your Bet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResultModal && (
          <div className="modal">
            <div className="result-modal-content">
              <div className="result-emoji">
                {result.status === "won"
                  ? "🎉"
                  : result.status === "lost"
                  ? "😢"
                  : "⚠️"}
              </div>
              <h2 className={`result-message ${result.status}`}>
                {result.message}
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Color;
