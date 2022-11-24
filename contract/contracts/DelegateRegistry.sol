pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DelegateRegistry is ERC721, Ownable {


    uint256 public minimumDonationValue = 0.1 ether;
    uint256 public currentSupply;
    uint256 public totalDonationsReceived;
    mapping(address =>  uint256) public delegateWallets;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("DelegateRegistry", "DLGT") {
        currentSupply = 0;
    }

    function increaseCurrentSupply() internal {
        currentSupply += 1;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }
    

    function mint(address to, string memory tokenURI_) external onlyOwner {
        require(delegateWallets[to] < 1, 'Only one delegate badge per wallet');
        delegateWallets[to]++;
        increaseCurrentSupply();
        uint256 newItemId = currentSupply;
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI_);
    }

    function donate() external payable {
        require(msg.value > minimumDonationValue, 'cant make an empty donation');
        totalDonationsReceived += msg.value;
    }

    function withdrawDonations() external payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}