pragma solidity ^0.5.0;
import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken,DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    //1.stakes tokens
    function stakeTokens (uint _amount) public {

        //transfer mock dai token to this smart contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        //add users to staking array only if they havent staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //update staking status 
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
    
    //2.unstaking tokens


    //3.issuing tokens

}