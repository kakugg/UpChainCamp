// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract Counter {

    uint256 initValue;

    constructor(uint256 _initValue) {
        initValue = _initValue;
    }

    function storageAdd(uint256 _value) public returns (uint256) {
        initValue += _value;
        return initValue;
    }

    function add(uint256 _value1,uint256 _value2) pure public returns(uint256){
        return _value1 + _value2;
    }

    function getBalance() view public returns(uint256 balance){
        balance = address(this).balance;
    }

    function addWei() payable public returns(uint256){
        return address(this).balance;
    }

}