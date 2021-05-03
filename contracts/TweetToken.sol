// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TweetToken is ERC20 {
    address public minter;

    event MinterChanged(address indexed from, address to);

    constructor() ERC20("Tweet", "TWT") {
        minter = msg.sender;
    }

    function passMinterRole(address tweetManager) public returns (bool) {
        require(msg.sender == minter, 'Only owner can change pass minter role');
        minter = tweetManager;

        emit MinterChanged(msg.sender, tweetManager);

        return true;
    }

    function mint(address account, uint256 amount) public {
		require(msg.sender == minter, 'You dont have a minter role');

        _mint(account, amount);
	}
}
