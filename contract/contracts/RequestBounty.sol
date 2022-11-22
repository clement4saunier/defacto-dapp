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

    event Publish(uint256 indexed requestId);
    event Respond(uint256 indexed requestId, uint256 indexed responseId);

    //Mapping from requestId to Request
    mapping(uint256 => Request) request;

    //Mapping from requestId to responseId to Response
    mapping(uint256 => mapping(uint256 => Response)) response;

    function publishRequest(string memory content, IERC20 bountyToken, uint256 bountyAmount) external returns (uint256 requestId) {
        requestId = uint256(keccak256(abi.encodePacked(content)));
        
        // /!\ need require() to check if request doesn't already exist
        request[requestId] = Request(msg.sender, content, bountyToken, bountyAmount);
        emit Publish(requestId);
    }

    function publishResponse(uint256 requestId, string memory content) external returns (uint256 responseId) {
        emit Respond(requestId, 0);
    }
}
