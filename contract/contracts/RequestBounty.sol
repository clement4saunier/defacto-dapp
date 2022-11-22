pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RequestBounty {
    struct Request {
        address sender;
        string content;
        IERC20 token;
        uint256 amount;
    }

    struct Response {
        address sender;
        string content;
    }

    //Mapping from requestId to Request
    mapping(uint256 => Request) request;

    //Mapping from requestId to responseId to Response
    mapping(uint256 => mapping(uint256 => Response)) response;

    function publishREquest(string memory content, IERC20 bountyToken, uint256 bountyAmount) external returns (uint256 requestId) {
        requestId = uint256(keccak256(abi.encodePacked(content)));
        
        // /!\ need require() to check if request doesn't already exist
        request[requestId] = Request(msg.sender, content, bountyToken, bountyAmount);
    }

    function publishResponse(string memory content) external returns (uint256 responseId) {

    }
}
