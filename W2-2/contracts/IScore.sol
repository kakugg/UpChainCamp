// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IScore {

    function setScore(uint _score) external;

    function getScore() external view returns(uint);

} 