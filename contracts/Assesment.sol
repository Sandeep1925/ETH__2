// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {

    struct Bid {
        address bidder;
        uint amount;
    }

    Bid[] public bids;
    uint public biddingLimit = 10 ether;
    uint public auctionEndTime;

    mapping(address => uint) public activeBids;

    event BidPlaced(address indexed bidder, uint amount);
    event BidCancelled(address indexed bidder, uint amount);
    event BiddingLimitChanged(uint newLimit);
    event BalanceUpdated(address indexed bidder, uint newBalance);

    function startAuction(uint duration) public {
        auctionEndTime = block.timestamp + duration;
    }

    function placeBid() public payable {
        require(block.timestamp < auctionEndTime, "Auction has ended");
        require(msg.value > 0, "No ETH sent with bid");
        require(msg.value <= biddingLimit, "Bid exceeds the limit");

        
        activeBids[msg.sender] += msg.value;
        bids.push(Bid(msg.sender, msg.value));

        emit BidPlaced(msg.sender, msg.value);
        emit BalanceUpdated(msg.sender, activeBids[msg.sender]);
    }

    function getBids() public view returns (Bid[] memory) {
        return bids;
    }

    function setBiddingLimit(uint newLimit) public {
        biddingLimit = newLimit;
        emit BiddingLimitChanged(newLimit);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function cancelBid(uint amount) public {
        require(activeBids[msg.sender] >= amount, "Insufficient active bid amount");
        
    
        payable(msg.sender).transfer(amount);
        activeBids[msg.sender] -= amount;

        emit BidCancelled(msg.sender, amount);
        emit BalanceUpdated(msg.sender, activeBids[msg.sender]);
    }

    receive() external payable {}
}
