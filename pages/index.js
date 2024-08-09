import { useState, useEffect } from "react";
import { ethers } from "ethers";
import auction_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [auction, setAUCTION] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [endTime, setEndTime] = useState(null);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const auctionABI = auction_abi.abi;

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
        await getWallet();
      } else {
        alert("Please install MetaMask to use this app.");
      }
    };
    init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (auction) {
        await getBalance();
        auction.on("BidPlaced", getBalance); 
        auction.on("BidCancelled", getBalance); 
      }
    };
    fetchData();
  }, [auction]);

  const getWallet = async () => {
    try {
      if (ethWallet) {
        const accounts = await ethWallet.request({ method: "eth_accounts" });
        handleAccount(accounts);
      }
    } catch (error) {
      console.error("Error fetching wallet accounts:", error);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      getAUCTIONContract();
    } else {
      alert("No account found. Please connect your wallet.");
    }
  };

  const connectAccount = async () => {
    try {
      if (ethWallet) {
        const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
        handleAccount(accounts);
      } else {
        alert("Please Connect MetaMask Wallet");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const getAUCTIONContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const auctionContract = new ethers.Contract(contractAddress, auctionABI, signer);
      setAUCTION(auctionContract);
    } catch (error) {
      console.error("Error getting auction contract:", error);
    }
  };

  const getBalance = async () => {
    try {
      if (auction && account) {
        const balance = await auction.getBalance();
        setBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const placeBid = async () => {
    try {
      if (auction) {
        const bidAmount = ethers.utils.parseEther("1");
        const tx = await auction.placeBid({
          value: bidAmount, 
        });
        await tx.wait();
        await getBalance(); 
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };
  

  const cancelBid = async () => {
    try {
      if (auction) {
        const tx = await auction.cancelBid(1, {
          gasLimit: ethers.utils.hexlify(300000), 
        });
        await tx.wait();
        await getBalance(); 
      }
    } catch (error) {
      console.error("Error cancelling bid:", error);
    }
  };

  const setAccountName = async (newName) => {
    try {
      if (auction) {
        const tx = await auction.setAccountName(newName);
        await tx.wait();
        alert("Account name successfully updated");
      }
    } catch (error) {
      console.error("Error setting account name:", error);
    }
  };

  const buttonSetAccountName = async () => {
    const newName = prompt("Please enter a name:");
    if (newName) {
      setName(newName);
      await setAccountName(newName);
    }
  };

  const setBiddingLimit = async (newLimit) => {
    try {
      if (auction) {
        await auction.setBiddingLimit(ethers.utils.parseEther(newLimit.toString()));
        setLimit(newLimit);
      }
    } catch (error) {
      console.error("Error setting bidding limit:", error);
    }
  };

  const startAuction = async (duration) => {
    try {
      if (auction) {
        await auction.startAuction(duration);
        setEndTime(Date.now() + duration * 1000);
      }
    } catch (error) {
      console.error("Error starting auction:", error);
    }
  };

  const getTimeRemaining = () => {
    if (endTime) {
      const timeLeft = Math.max(0, endTime - Date.now());
      return new Date(timeLeft).toISOString().substr(11, 8);
    }
    return "N/A";
  };

  return (
    <main className="container">
      <header>
        <h1>WELCOME TO SANDEEP'S AUCTION HOUSE</h1>
        <div className="name-input">
          <label htmlFor="accountName">Bidder's Account Name:</label>
          <input
            id="accountName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </header>
      {account ? (
        <div className="overlay">
          <p>Account Balance: {balance} ETH</p>
          <p>Bidder's Account: {account}</p>
          <button onClick={placeBid}>Place 1 Bid 💸</button>
          <button onClick={cancelBid}>Cancel 1 Bid 💸</button>
          <button onClick={buttonSetAccountName}>Set Account Name</button>
          <button onClick={() => startAuction(3600)}>Start Auction for 1 hour</button>
          <button onClick={() => setBiddingLimit(limit)}>Set Bidding Limit to {limit} ETH</button>
          <p>Time Remaining: {getTimeRemaining()}</p>
        </div>
      ) : (
        <button onClick={connectAccount}>Connect your Metamask wallet</button>
      )}
      <style jsx>
        {`
          .container {
            text-align: center;
            background-color: #f0e68c;
            background-image: url('/path-to-your-image/ethereum.png');
            background-size: cover;
            background-repeat: no-repeat;
            color: #333;
            font-family: "Arial", Times New Roman;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          header {
            padding: 20px;
            width: 100%;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          h1 {
            font-family: "Arial", Times New Roman;
            font-size: 45px;
            margin-bottom: 20px;
            color: #4caf50;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .name-input {
            width: 29%;
            text-align: left;
            margin: 15px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .name-input label {
            font-size: 18px;
            display: block;
            margin-bottom: 10px;
          }

          .name-input input {
            font-size: 15px;
            padding: 5px;
            width: 59%;
            border-radius: 100px;
            border: 3px solid #ccc;
          }

          .overlay {
            text-align: center;
            width: 100%;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            padding: 20px;
          }

          p {
            font-size: 22px;
            margin-bottom: 20px;
            color: #333;
          }

          button {
            background-color: #4caf50;
            color: #fff;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s;
            margin: 10px;
          }

          button:hover {
            background-color: #45a049;
          }
        `}
      </style>
    </main>
  );
}
