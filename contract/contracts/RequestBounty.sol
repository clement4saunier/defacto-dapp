pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RequestBounty {
    struct Request {
        address owner;
        string content;
        IERC20 token;
        uint256 amount;
        uint deadline;
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

    function _mintRequest(
        uint256 id,
        address to,
        string memory content,
        IERC20 bountyToken,
        uint256 bountyAmount,
        uint deadline
    ) internal {
        require(
            bountyToken.allowance(to, address(this)) >= bountyAmount &&
                bountyToken.transferFrom(to, address(this), bountyAmount),
            "Token deposit failed."
        );
        request[id] = Request(to, content, bountyToken, bountyAmount, deadline);
        emit Publish(id);
    }

    function publishRequest(
        string memory content,
        IERC20 bountyToken,
        uint256 bountyAmount,
        uint deadline
    ) external returns (uint256 requestId) {
        requestId = uint256(keccak256(abi.encodePacked(content)));
        require (request[requestId].owner == address(0), "Request already posted");

        _mintRequest(
            requestId,
            msg.sender,
            content,
            bountyToken,
            bountyAmount,
            deadline
        );
    }

    function requestURI(uint256 requestId) public view returns (string memory) {
        return request[requestId].content; //ipfs://QMMLI3120SDFMKLSDJFJE
    }

    function publishResponse(uint256 requestId, string memory content)
        external
        returns (uint256 responseId)
    {
        emit Respond(requestId, 0);
    }
}
