const truffleAssert = require('truffle-assertions');

const TweetManager = artifacts.require("./TweetManager.sol");

contract("TweetManager", accounts => {
  it("should be able to create new tweet.", async () => {
    const tweetManagerInstance = await TweetManager.deployed();
    const message = "My test tweet";

    const result = await tweetManagerInstance.create(message, { from: accounts[0] });

    truffleAssert.eventEmitted(result, 'TweetCreated', (ev) => {
      return ev.message === message;
    });
  });
});
