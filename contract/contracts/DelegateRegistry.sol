pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DelegateRegistry is ERC721, Ownable {
    uint256 public minimumDonationValue = 0.1 ether;
    uint256 public totalDonationsReceived;
    mapping(address => uint256) public delegateWallets;

    mapping(uint256 => string) private _tokenURIs;
    mapping (uint256 => string) private _identifiers;

    constructor() ERC721("DelegateRegistry", "DLGT") {
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return _tokenURIs[tokenId];
    }

    function lookup(uint256 tokenId) public view returns (string memory){
        return _identifiers[tokenId];
    }

    function mint(address to, string memory delegate, string memory content) external onlyOwner {
        uint256 newItemId = uint256(keccak256(abi.encodePacked(delegate)));

        _identifiers[newItemId] = delegate;
        _mint(to, newItemId);
        _setTokenURI(newItemId, content);
    }

    function donate() external payable {
        require(
            msg.value > minimumDonationValue,
            "cant make an empty donation"
        );
        totalDonationsReceived += msg.value;
    }

    function withdrawDonations() external payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
