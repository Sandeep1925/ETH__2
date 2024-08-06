// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    mapping(address => uint256) private balances;
    mapping(address => string) private names;
    address private owner;

    event BalanceUpdated(address indexed account, uint256 newBalance);
    event BidPlaced(address indexed account, uint256 amount);
    event BidCanceled(address indexed account, uint256 amount);
    event AccountNameUpdated(address indexed account, string newName);

    function getBalance() public view returns (uint256) {
    require(msg.sender == owner, "Only owner can call this function");
    return address(this).balance;
}


    function placeBid(uint256 amount) public {
        balances[msg.sender] += amount;
        emit BidPlaced(msg.sender, amount);
        emit BalanceUpdated(msg.sender, balances[msg.sender]);
    }

    function cancelBid(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        emit BidCanceled(msg.sender, amount);
        emit BalanceUpdated(msg.sender, balances[msg.sender]);
    }

    function setAccountName(string memory newName) public {
        names[msg.sender] = newName;
        emit AccountNameUpdated(msg.sender, newName);
    }
}
