var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TweetManager = artifacts.require("./TweetManager.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TweetManager);
};
