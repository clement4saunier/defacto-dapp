pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DefactoToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000000000);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function decimals() override {
        return 9;
    }
}