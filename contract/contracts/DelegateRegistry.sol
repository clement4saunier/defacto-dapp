pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DelegateRegistry is ERC721, Ownable {

    uint256 currentSupply;
    mapping(address =>  uint256) public delegateWallets;

    constructor() ERC721("DelegateRegistry", "DLGT") {
        currentSupply = 0;
    }

    function increaseCurrentSupply() private {
        currentSupply += 1;
    }

    function mint(address to) external onlyOwner {
        require(delegateWallets[to] < 1, 'Only one delegate badge per wallet');
        delegateWallets[to]++;
        increaseCurrentSupply();
        uint256 tokenId = currentSupply;
        _safeMint(to, tokenId);
    }
}