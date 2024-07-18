## Project Title  
Ethereum ATM Simulation

## Problem Statement
Create an Ethereum smart contract with functions for depositing, withdrawing, and checking balance using Solidity, and interact with it using a React frontend. The smart contract should include error handling using require(), assert(), and revert() statements.

## Description  
The Assessment contract facilitates the deposit and withdrawal of funds with appropriate error handling mechanisms. A React frontend is provided to interact with the contract, allowing users to connect their Ethereum wallet, view their balance, and perform deposit and withdrawal operations.

## Features
1. Deposit ETH: Users can deposit ETH into the contract.
2. Withdraw ETH: Users can withdraw ETH from the contract.
3. View Balance: Users can view their current balance.
4. Error Handling: Ensures safe operations with error handling using require(), assert(), and revert().
5. MetaMask Integration: Connect and interact with the contract using MetaMask.

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
The Assessment contract allows for the deposit and withdrawal of funds, including error handling using require(), assert(), and a custom error with revert().

### Frontend Interaction

#### index.js
The index.js file provides a React component to interact with the Assessment contract. Users can connect their Ethereum wallet, view their balance, and perform deposit and withdrawal operations.

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

  


## Authors  
Sandeep Kaur @Sandeep1925

## License  
This project is licensed under the MIT License - see the LICENSE.md file for details.  


