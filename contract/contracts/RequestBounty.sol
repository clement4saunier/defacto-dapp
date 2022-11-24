pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract RequestBounty {
    IERC721 public delegateRegistry;
    uint256 DELEGATE_SHARE = 20;

    constructor(IERC721 _delegateRegistry) {
        delegateRegistry = _delegateRegistry;
    }

    struct Request {
        address owner;
        string content;
        IERC20 token;
        uint256 amount;
        uint deadline;
        string delegate;
    }

    struct Response {
        address sender;
        string content;
    }

    event Publish(uint256 indexed requestId);
    event Respond(uint256 indexed requestId, uint256 indexed responseId);

    //Mapping from requestId to Request
    mapping(uint256 => Request) public request;

    //Mapping from requestId to responseId to Response
    mapping(uint256 => mapping(uint256 => Response)) public response;

    function _mintRequest(
        uint256 id,
        address to,
        string memory content,
        IERC20 bountyToken,
        uint256 bountyAmount,
        uint deadline,
        string memory delegate
    ) internal {
        require(
            bountyToken.allowance(to, address(this)) >= bountyAmount &&
                bountyToken.transferFrom(to, address(this), bountyAmount),
            "Token deposit failed."
        );
        require(
            delegateRegistry.ownerOf(
                uint256(keccak256(abi.encodePacked(delegate)))
            ) != address(0),
            "Delegate does not exist"
        );

        request[id] = Request(
            to,
            content,
            bountyToken,
            bountyAmount,
            deadline,
            delegate
        );
        emit Publish(id);
    }

    function publishRequest(
        string memory content,
        IERC20 bountyToken,
        uint256 bountyAmount,
        uint deadline,
        string memory delegate
    ) external returns (uint256 requestId) {
        requestId = uint256(keccak256(abi.encodePacked(content)));
        require(
            request[requestId].owner == address(0),
            "Request already posted"
        );

        _mintRequest(
            requestId,
            msg.sender,
            content,
            bountyToken,
            bountyAmount,
            deadline,
            delegate
        );
    }

    function settleRequest(
        uint256 requestId,
        uint256[] memory responses,
        uint256[] memory distribution
    ) external {
        Request memory _request = request[requestId];
        IERC20 token = _request.token;
        uint256 length = responses.length;
        require(
            length == distribution.length,
            "Responses does not match distribution count"
        );
        uint256 delegateAmount = (_request.amount * DELEGATE_SHARE) / 100;
        uint256 split = _request.amount - delegateAmount;
        uint256 expense = split;

        for (uint i = 0; i < length; ) {
            uint256 amount = (split * distribution[i]) / 100;
            require(
                token.transfer(
                    response[requestId][responses[i]].sender,
                    amount
                ),
                "Token transfer failed"
            );

            unchecked {
                expense -= amount;
                i++;
            }
        }
        require(expense >= 0, "Distribution overflow");
        delegateAmount += expense;

        require(
            token.transfer(
                delegateRegistry.ownerOf(
                    uint256(keccak256(abi.encodePacked(_request.delegate)))
                ),
                delegateAmount
            ),
            "Delegate transfer failed"
        );
    }

    function requestURI(uint256 requestId) public view returns (string memory) {
        return string(abi.encodePacked("ipfs://", request[requestId].content));
    }

    function publishResponse(uint256 requestId, string memory content)
        external
        returns (uint256 responseId)
    {
        responseId = uint256(keccak256(abi.encodePacked(content)));
        require(
            response[requestId][responseId].sender == address(0),
            "Response already posted"
        );

        response[requestId][responseId] = Response(msg.sender, content);
        emit Respond(requestId, responseId);
    }
}
