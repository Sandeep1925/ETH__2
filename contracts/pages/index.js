import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState(1); 
  const [withdrawAmount, setWithdrawAmount] = useState(1); 

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
      getATMContract();
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const balance = await atm.getBalance();
        setBalance(balance.toNumber());
      } catch (error) {
        console.error("Error getting balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(depositAmount);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(withdrawAmount);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="user-panel">
        <p className="user-info highlight">Your Account: {account}</p>
        <p className="user-info highlight">Your Balance: {balance} ETH</p>
        <div>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter deposit amount"
          />
          <button className="btn bold" onClick={deposit}>
            Deposit ETH💸
          </button>
        </div>
        <div>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter withdraw amount"
          />
          <button className="btn bold" onClick={withdraw}>
            Withdraw ETH💸
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Sandeep's ATM😊</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: left;
          padding: 20px;
          background: linear-gradient(135deg, #ffc0cb 30%, #ff69b4 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          animation: backgroundAnimation 10s ease infinite;
        }
        @keyframes backgroundAnimation {
          0% {
            background: linear-gradient(135deg, #ffc0cb 30%, #ff69b4 100%);
          }
          50% {
            background: linear-gradient(135deg, #ff69b4 30%, #ffc0cb 100%);
          }
          100% {
            background: linear-gradient(135deg, #ffc0cb 30%, #ff69b4 100%);
          }
        }
        .user-panel {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 16px;
          margin-top: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          width: 300px;
          transition: transform 0.3s;
        }
        .user-panel:hover {
          transform: scale(1.05);
        }
        .user-info {
          margin-bottom: 10px;
          font-size: 18px;
          color: #333;
        }
        .user-info.highlight {
          color: white;
          background-color: #ff69b4;
          padding: 5px 10px;
          border-radius: 5px;
          display: inline-block;
        }
        .btn {
          background: linear-gradient(90deg, #4caf50 0%, #2e7d32 100%);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          margin-right: 10px;
          transition: background 0.3s ease, transform 0.3s ease;
          font-size: 16px;
          font-weight: bold;
        }
        .btn.bold {
          font-size: 18px;
          font-weight: bold;
        }
        .btn:hover {
          background: linear-gradient(90deg, #45a049 0%, #1b5e20 100%);
          transform: scale(1.1);
        }
        header {
          margin-bottom: 20px;
          text-align: left;
          width: 100%;
        }
        h1 {
          color: #fff;
          font-size: 3.5rem;
          animation: textAnimation 1.5s ease-in-out infinite alternate;
        }
        @keyframes textAnimation {
          from {
            text-shadow: 0 0 10px #fff, 0 0 20px #ff69b4, 0 0 30px #ff69b4, 0 0 40px #ff69b4;
          }
          to {
            text-shadow: 0 0 20px #fff, 0 0 30px #ff69b4, 0 0 40px #ff69b4, 0 0 50px #ff69b4;
          }
        }
      `}</style>
    </main>
  );
}
