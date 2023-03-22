// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Vault{
    using SafeERC20 for IERC20;

    mapping(address => mapping(address => uint256)) userDepositeMapping;

    fallback() external payable{
    }

    receive() external payable{
    }

    function deposite(address _tokenAddr,uint256 _amout) public{
        IERC20 token = IERC20(_tokenAddr);
        // require(token.allowance[msg.sender][address(this)] > _amout,"Allowance Not Enough");
        token.transferFrom(msg.sender,address(this),_amout);

        userDepositeMapping[msg.sender][_tokenAddr] += _amout;
    }

    function withdraw(address _tokenAddr,uint256 _amout) public{
        IERC20 token = IERC20(_tokenAddr);

        require(userDepositeMapping[msg.sender][_tokenAddr] >= _amout,"Balance Not Enough");
        
        token.transferFrom(address(this),msg.sender,_amout);

        userDepositeMapping[msg.sender][_tokenAddr] -= _amout;
    }
}