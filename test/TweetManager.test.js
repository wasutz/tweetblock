const truffleAssert = require('truffle-assertions');

const TweetManager = artifacts.require("./TweetManager.sol");

contract("TweetManager", accounts => {

  it("should be able to create new tweet", async () => {
    const tweetManagerInstance = await TweetManager.deployed();

    const message = "My test tweet";
    const imageHash = "XYZ";
    const result = await tweetManagerInstance.create(message, imageHash, { from: accounts[0] });

    const tweet = await tweetManagerInstance.tweets(1);
    const tweetCount = await tweetManagerInstance.tweetCount();

    const ownerTweet = await tweetManagerInstance.ownerTweets(accounts[0], 1);
    const ownerTweetCount = await tweetManagerInstance.ownerTweetCount(accounts[0]);

    assert.equal(tweet.message, message);
    assert.equal(tweet.image, imageHash);
    assert.equal(tweetCount, 1);
    assert.equal(ownerTweet.message, message);
    assert.equal(ownerTweetCount, 1);
    truffleAssert.eventEmitted(result, 'TweetCreated', (ev) => {
      return ev.message === message;
    });
  });
});
