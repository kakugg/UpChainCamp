//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Bank is Ownable{

    error BalanceNotEnough();

    uint256 public depositMinValue = 0 wei;

    enum DepositType{OUT,IN}

    struct DepositInfo{
        uint256 value;
        uint time;
        DepositType depositType;
    }

    mapping(address => DepositInfo[]) public userAccessList;

    constructor(uint256 _depositMinValue){
        depositMinValue = _depositMinValue;
    }

    receive() payable external{
        deposit();
    }

    fallback() payable external{
        deposit();
    }

    function setDepositMinValue(uint _depositMinValue) public onlyOwner{
        depositMinValue = _depositMinValue;
    }

    function deposit() public payable{
        require(msg.value < depositMinValue,"Value Too Low");
        addRecord(msg.value,DepositType.IN);
    }

    function withdraw(uint256 value) public{
        if(value > getUserBalance(msg.sender)){
            revert BalanceNotEnough();
        }
        payable(msg.sender).transfer(value);
        addRecord(value,DepositType.OUT);
    }

    function withdrawAll() public{
        uint256 userBalance = getUserBalance(msg.sender);
        if(userBalance == 0){
            revert BalanceNotEnough();
        }
        payable(msg.sender).transfer(getUserBalance(msg.sender));
        addRecord(userBalance,DepositType.OUT);
    }

    function addRecord(uint256 _value,DepositType _type) internal{
        DepositInfo memory info;
        info.time = block.timestamp;
        info.depositType = _type;
        info.value = _value;
        userAccessList[msg.sender].push(info);
    }

    function getUserBalance(address _addr) view public returns(uint256 balance){
        DepositInfo[] memory list = userAccessList[_addr];
        for(uint i = 1;i < list.length;i++){
            if(list[i].depositType == DepositType.IN){
                balance += list[i].value;
            }else{
                balance -= list[i].value;
            }
        }
    }

    function rug() public onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }
}