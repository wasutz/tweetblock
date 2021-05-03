// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./TweetToken.sol";

contract TweetManager {
  struct Tweet {
    uint id;
    string message;
    string image;
    address owner;
  }

  event TweetCreated(
    uint id,
    string message,
    string image,
    address owner
  );

  mapping(uint => Tweet) public tweets;
  uint public tweetCount;

  mapping(address => mapping(uint => Tweet)) public ownerTweets;
  mapping(address => uint) public ownerTweetCount;

  TweetToken private tweetToken;

  constructor(TweetToken _tweetToken) {
    tweetToken = _tweetToken;
  }

  function create(string memory message, string memory image) public {
    tweetCount++;
    tweets[tweetCount] = Tweet(tweetCount, message, image, msg.sender);

    ownerTweetCount[msg.sender] =  ownerTweetCount[msg.sender] + 1;
    ownerTweets[msg.sender][ownerTweetCount[msg.sender]] = tweets[tweetCount];

    if (ownerTweetCount[msg.sender] % 3 == 0) {
      tweetToken.mint(msg.sender, 100);
    }

    emit TweetCreated(tweetCount, message, image, msg.sender);
  }
}
