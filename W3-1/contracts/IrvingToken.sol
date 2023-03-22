// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract IrvingToken is ERC20{

    constructor() ERC20("Irving Token","IT"){
        _mint(msg.sender,10000*10**18);
    }
    
}