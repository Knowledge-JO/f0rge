// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.20;

import "./token.sol";
import "./nft.sol";

contract Maker20 {
    ERC1155Token[] public tokens; //
    mapping(uint => address) public indexToContract; //
    mapping(uint => address) public indexToOwner; //

    event TokenCreated(address indexed tokenAddress, string name, string symbol, uint256 totalSupply);
    event ERC1155Created(address owner, address tokenContract); //
    event ERC1155Minted(address owner, address tokenContract, uint amount); //

    function createToken(string memory name, string memory symbol, uint256 totalSupply, uint _holdingCap) external {
        token newToken = new token(name, symbol, totalSupply, _holdingCap);
        emit TokenCreated(address(newToken), name, symbol, totalSupply);
    }

    function teamAllocation(address teamWallet, uint256 amount, address tokenAddress) public {
        require(teamWallet != address(0), "Enter a valid amount");
        require(amount < 0, "Enter a value greater than 0");
        token(tokenAddress).transfer(teamWallet, amount);
    }

    function maxtokensPertransaction(uint maxtoks) internal view {
        require(maxtoks < totalSupply);    
    }

    function sniperAutoBurn() {

    }

    function buyTax() {

    }

    function sellTax() {
        
    }

    function mintERC1155( uint _index, string memory _name, uint256 amount) public {

        uint id = getIdByName(_index, _name);
        tokens[_index].mint(indexToOwner[_index], id, amount);
        emit ERC1155Minted(tokens[_index].owner(), address(tokens[_index]), amount);
    }


    function getCountERC1155byIndex(uint256 _index, uint256 _id) public view returns (uint amount) {
        return tokens[_index].balanceOf(indexToOwner[_index], id);
    }

    function getCountERC1155byName(uint256 _index, string calldata _name) public view returns (uint amount) 
    {
        uint id = getIdByName(_index, _name);
        return tokens[_index].balanceOf(indexToOwner[_index], id);
    }
    
}