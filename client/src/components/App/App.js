import React, { Component } from "react";
import TweetManager from "../../contracts/TweetManager.json";
import getWeb3 from "../../getWeb3";
import {AppBar, Toolbar, Container, Typography, Button, CssBaseline, CircularProgress}
  from '@material-ui/core';
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
    const web3 = await this.prepareWeb3();
    web3.eth.subscribe('newBlockHeaders', (error) => {
      if (!error) {
        this.load10LastestTweets();
      }
    });
  };

  prepareWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TweetManager.networks[networkId];
      const instance = new web3.eth.Contract(
        TweetManager.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, this.load10LastestTweets);

      return web3;
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  load10LastestTweets = async () => {
    const {contract} = this.state;

    const tweetCount = await contract.methods.tweetCount().call();
    if (tweetCount <= 0) {
      return;
    }

    const tweets = [];
    for (let i = tweetCount; i >= Math.max(tweetCount - 9, 1); i--) {
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
    const {tweets, web3} = this.state;

    return (
      <>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <a href="/" className="menu">
              <Typography variant="h6">
                Tweet Block
              </Typography>
            </a>
            <div className="menus">
              <a href="/" className="menu">
                <Button color="inherit">Home</Button>
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <Container maxWidth={"sm"}>
          {web3 ? (
            <>
              <TweetForm onSubmit={this.createTweet} />
              <TweetList tweets={tweets} />
            </>
          ) : (
            <div className="loading-container">
              <CircularProgress />
            </div>
          )}
        </Container>
      </>
    );
  }
}

export default App;
