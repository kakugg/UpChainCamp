// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IScore.sol";

contract Student is IScore{

    uint score;

    address owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner,"You are not the teacher");
        _;
    }

    function setScore(uint _score) external override virtual onlyOwner{
        require(_score < 101,"Incorrect Socre");
        score = _score;
    }

    function getScore() external override virtual view returns(uint){
        return score;
    }

}