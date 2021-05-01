// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract TweetManager {
  struct Tweet {
    uint id;
    string message;
    string image;
    address owner;
  }

  mapping(uint => Tweet) public tweets;
  uint public tweetCount;

  mapping(address => mapping(uint => Tweet)) public ownerTweets;
  mapping(address => uint) public ownerTweetCount;

  event TweetCreated(
    uint id,
    string message,
    string image,
    address owner
  );

  function create(string memory message, string memory image) public {
    tweetCount++;
    tweets[tweetCount] = Tweet(tweetCount, message, image, msg.sender);

    ownerTweetCount[msg.sender] =  ownerTweetCount[msg.sender] + 1;
    ownerTweets[msg.sender][ownerTweetCount[msg.sender]] = tweets[tweetCount];

    emit TweetCreated(tweetCount, message, image, msg.sender);
  }
}
