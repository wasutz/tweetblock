var TweetManager = artifacts.require("./TweetManager.sol");
var TweetToken = artifacts.require("./TweetToken.sol");

module.exports = async deployer => {
  await deployer.deploy(TweetToken);
  const token = await TweetToken.deployed();

	await deployer.deploy(TweetManager, token.address);

  const manager = await TweetManager.deployed();

  await token.passMinterRole(manager.address);
};
