pragma solidity ^0.8.9;

contract Assessment {
    address payable public contractOwner;
    uint256 public accountBalance;

    event FundsDeposited(uint256 amount);
    event FundsWithdrawn(uint256 amount);

    constructor(uint256 initialBalance) payable {
        contractOwner = payable(msg.sender);
        accountBalance = initialBalance;
    }

    function getBalance() public view returns (uint256) {
        return accountBalance;
    }

    function deposit(uint256 depositAmount) public payable {
        uint256 previousBalance = accountBalance;

        // Ensure the caller is the contract owner
        require(msg.sender == contractOwner, "Only the owner can deposit funds");

        // Add the deposit amount to the account balance
        accountBalance += depositAmount;

        // Verify the transaction was successful
        assert(accountBalance == previousBalance + depositAmount);

        // Emit the deposit event
        emit FundsDeposited(depositAmount);
    }

    // Custom error for insufficient balance
    error InsufficientBalance(uint256 currentBalance, uint256 amountRequested);

    function withdraw(uint256 withdrawalAmount) public {
        require(msg.sender == contractOwner, "Only the owner can withdraw funds");
        uint256 previousBalance = accountBalance;

        // Check if there are enough funds to withdraw
        if (accountBalance < withdrawalAmount) {
            revert InsufficientBalance({
                currentBalance: accountBalance,
                amountRequested: withdrawalAmount
            });
        }

        // Subtract the withdrawal amount from the account balance
        accountBalance -= withdrawalAmount;

        // Verify the transaction was successful
        assert(accountBalance == previousBalance - withdrawalAmount);

        // Emit the withdrawal event
        emit FundsWithdrawn(withdrawalAmount);
    }
}
