## Project Title  
Ethereum Auction House Frontend

## Problem Statement
Create an Ethereum smart contract with functions for Placing Bid, Canceling Bid,Getting Balance and setting Bidder's Account name using Solidity, and interact with it using a React frontend.

## Description  
Develop a React frontend for an Ethereum-based auction house that integrates with MetaMask to manage user accounts and bid transactions. The interface should connect to a smart contract for placing and canceling bids, display account balances, and allow users to set their account names. Ensure the application is user-friendly, responsive, and provides clear error handling and loading states.

## Features
1. MetaMask Integration:Connect and manage Ethereum wallets through MetaMask. Display the connected account and provide options for account management.

2.Smart Contract Interaction:Place and cancel bids via the smart contract. Display contract balance and user-specific balance.

3.Account Management:Set and update user account names. View and display the current account name.

4.User Interface: Responsive design with a clean layout. Custom styling including background images and interactive elements.Visual feedback for loading states
and error handling.

5.Error Handling and User Feedback:Graceful handling of connection and transaction errors. Alerts and notifications for successful actions and errors.

## Customization

1. UI Customization: Customize the appearance of the React frontend with different themes and styles to make the interface more attractive.
2. Contract Modification: Modify the Assessment contract to add more functionalities or change existing ones according to specific requirements.
3. Deployment Options: Deploy the contract on various Ethereum test networks 

## Getting Started

### Prerequisites

1. Node.js and npm installed
2. MetaMask extension installed in your browser
3. A test Ethereum network

### Installing  
1. Clone the repository to your local machine.
2. Install the required dependencies for the React frontend.

### Smart Contract

#### Assessment.sol
The Assessment contract allows for the Placing and Canceling of Bids and updating bidders's account name.

### Frontend Interaction

#### index.js
The index.js file provides a React component to interact with the Assessment contract. Users can connect their Ethereum wallet, view their balance, and perform Placing and Canceling Bids operations with updation of account name.

### Deployment Script

#### deploy.js
The deploy.js script is used to deploy the Assessment contract to the Ethereum network. It utilizes Hardhat for deployment tasks.

   

    
## How to Run the Program  

1. Compile the Solidity contract:
npx hardhat compile

2. Deploy the contract:
npx hardhat run scripts/deploy.js --network ropsten

3. Run the React frontend:
npm run dev

## Output

![image](https://github.com/user-attachments/assets/358e8785-7d90-4559-ad20-928f34d73001)


  


## Authors  
Sandeep Kaur @Sandeep1925

## License  
This project is licensed under the MIT License - see the LICENSE.md file for details.  


