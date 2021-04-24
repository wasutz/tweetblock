import React, { Component } from "react";
import TweetManager from "../../contracts/TweetManager.json";
import getWeb3 from "../../getWeb3";
import {Container, Typography, CssBaseline} from '@material-ui/core';
import TweetForm from '../TweetForm/TweetForm';
import TweetList from '../TweetList/TweetList';
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
      const tweet = await contract.methods.tweets(i).call();
      tweets.push(tweet);
    }

    this.setState({tweets});
  };

  createTweet = async (message) => {
    const {accounts, contract} = this.state;

    if (!message) {
      return;
    }

    await contract.methods.create(message).send({from: accounts[0]});
    this.setState({message: ''});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const {tweets} = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth={"sm"}>
          <Typography component="h1" variant="h2">
              Tweet Block
          </Typography>
          <TweetForm onSubmit={this.createTweet} />
          <TweetList tweets={tweets} />
        </Container>
      </div>
    );
  }
}

export default App;
