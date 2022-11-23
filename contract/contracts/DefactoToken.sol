pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DefactoToken is ERC20 {
    constructor() ERC20("Defacto", "FACT") {
        _mint(msg.sender, 100000000000);
    }
}