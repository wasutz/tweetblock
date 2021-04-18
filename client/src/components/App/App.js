import React, { Component } from "react";
import TweetManager from "../../contracts/TweetManager.json";
import getWeb3 from "../../getWeb3";
import {TextField, Button} from '@material-ui/core';

import "./App.css";

class App extends Component {
  state = {
    tweets: [],
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TweetManager.networks[networkId];
      const instance = new web3.eth.Contract(
        TweetManager.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, this.loadAllTweets);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  loadAllTweets = async () => {
    const {contract} = this.state;

    const tweetCount = await contract.methods.tweetCount().call();
    if (tweetCount <= 0) {
      return;
    }

    const tweets = [];

    for (let i = tweetCount; i >= 1; i--) {
      const tweet = await contract.methods.tweets(i - 1).call();
      tweets.push(tweet);
    }

    console.log(tweets);

    this.setState({tweets});
  };

  createTweet = async () => {
    const {accounts, contract, message} = this.state;

    console.log(message);
    await contract.methods.create(message).send({from: accounts[0]});
  }

  onChangeTweetMessage = (event) => {
    this.setState({message: event.target.value})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const {tweets} = this.state;

    return (
      <div className="App">
        <h1>Tweet Block</h1>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={2}
          value={this.state.message}
          placeholder="What's happening?"
          onChange={this.onChangeTweetMessage}
          variant="outlined" />
        <Button variant="contained" color="primary" onClick={this.createTweet}>
          Tweet
        </Button>

        {tweets.map(tweet => (
          <p key={tweet.id}>{tweet.message}</p>
        ))}
      </div>
    );
  }
}

export default App;
