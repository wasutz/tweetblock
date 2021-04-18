// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract TweetManager {
  struct Tweet {
    uint id;
    string message;
    address owner;
  }

  mapping(uint => Tweet) public tweets;
  uint public tweetCount;

  event TweetCreated(
    uint id,
    string message,
    address owner
  );

  function create(string memory message) public {
    tweetCount++;
    tweets[tweetCount] = Tweet(tweetCount, message, msg.sender);

    emit TweetCreated(tweetCount, message, msg.sender);
  }
}
