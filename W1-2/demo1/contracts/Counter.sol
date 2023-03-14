//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint counter;

    address deployer;

    constructor() {
        counter = 0;
        deployer = msg.sender;
    }

    function count() public {
        require(msg.sender == deployer,"No Access");
        counter = counter + 1;
        console.log("counter is %s",counter);
    }

    function get() public view returns (uint) {
        return counter;
    }
}