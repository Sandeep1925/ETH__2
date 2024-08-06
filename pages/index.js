import { useState, useEffect } from "react";
import { ethers } from "ethers";
import auction_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [auction, setAUCTION] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [name, setName] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const auctionABI = auction_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account ) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account is found like this");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("Please Connect Metamask Wallet");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getAUCTIONContract();
  };

  const getAUCTIONContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const auctionContract = new ethers.Contract(contractAddress, auctionABI, signer);

    setAUCTION(auctionContract);
  };

  const getBalance = async() => {
    if (auction) {
      setBalance((await auction.getBalance()).toNumber());
    }
  }
  

  const placeBid = async () => {
    if (auction) {
      let tx = await auction.placeBid(1);
      await tx.wait();
      getBalance();
    }
  };

  const cancelBid = async () => {
    if (auction) {
      let tx = await auction.cancelBid(1);
      await tx.wait();
      getBalance();
    }
  };

  const setAccountName = async (newName) => {
    if (auction) {
      try {
        const tx = await auction.setAccountName(newName);
        await tx.wait();

        alert("Account name successfully updated");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buttonSetAccountName = async () => {
    const newName = await prompt("Please enter a name:");
    setName(newName);
    await setAccountName(newName);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>You need to install Metamask in order to use this auction house.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance(account);
    }

    return (
      <div className="overlay">
        <p>Account Balance: {balance} ETH </p>
        <p>Bidder's Account: {account}</p>
        <button onClick={placeBid}>Place 1 Bid 💸</button>
        <button onClick={cancelBid}>Cancel 1 Bid 💸</button>
        <button onClick={buttonSetAccountName}>Set Account Name</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

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
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
            background-color: #f0e68c; /* Light yellow background */
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
            background: rgba(255, 255, 255, 0.8); /* Semi-transparent background for header */
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for header */
            display: flex;
            flex-direction: column;
            align-items: center; /* Center align items */
          }

          h1 {
            font-family: "Arial", Times New Roman;
            font-size: 45px; /* Smaller font size */
            margin-bottom: 20px;
            color: #4caf50; /* Green color for the header */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Shadow effect for text */
          }

          .name-input {
            width: 29%; /* Adjust width as needed */
            text-align: left;
            margin: 15px 0;
            display: flex;
            flex-direction: column;
            align-items: center; /* Center align items */
          }

          .name-input label {
            font-size: 18px; /* Matching the size of Account Balance */
            display: block;
            margin-bottom: px;
            
          }

          .name-input input {
            font-size: 15px;
            padding: 5px;
            width: 59%; /* Full width */
            border-radius: 100px;
            border: 3px solid #ccc;
          }

          .overlay {
            text-align: center;
            width: 100%;
            background: rgba(255, 255, 255, 0.8); /* Semi-transparent background for overlay */
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for overlay */
            padding: 20px;
          }

          p {
            font-size: 22px; /* Ensure font size matches */
            margin-bottom: 20px;
            color: #333; /* Darker text color */
          }

          .account {
            font-size: 14px; /* Smaller font size for Bidder's Account */
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
            background-color: #45a049; /* Darker green on hover */
          }
        `}
      </style>
    </main>
  );
}
