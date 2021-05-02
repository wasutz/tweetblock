import React, { Component } from "react";
import TweetManager from "../../contracts/TweetManager.json";
import getWeb3 from "../../getWeb3";
import {AppBar, Toolbar, Container, Typography, Button, CssBaseline, CircularProgress}
  from "@material-ui/core";
import TweetForm from "../TweetForm/TweetForm";
import TweetList from "../TweetList/TweetList";
import ipfs from "ipfs-core";
import "./App.css";

class App extends Component {
  state = {
    tweets: [],
    web3: null,
    accounts: null,
    contract: null,
    error: null
  };

  componentDidMount = async () => {
    const web3 = await this.prepareWeb3();
    if (web3) {
      this.load10LastestTweets();
      this.subscribeForNewTweet(web3);
    }
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

      this.setState({ web3, accounts, contract: instance, error: null });

      return web3;
    } catch (error) {
      this.setState({error})
    }
  };

  subscribeForNewTweet = web3 => {
    web3.eth.subscribe('newBlockHeaders', (error) => {
      if (!error) {
        this.load10LastestTweets();
      }
    });
  }

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

  createTweet = async (message, image) => {
    const {accounts, contract} = this.state;

    if (!message) {
      return;
    }

    const imageHash = image ? await this.uploadImage(image) : '';

    await contract.methods.create(message, imageHash).send({from: accounts[0]});
  }

  uploadImage = async image => {
    const ipfsInstance = await ipfs.create();
    const result = await ipfsInstance.add(image);

    return result.path;
  };

  render() {
    const {tweets, web3, error} = this.state;

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
          {web3 && (
            <>
              <TweetForm onSubmit={this.createTweet} />
              <TweetList tweets={tweets} />
            </>
          )}

          {error && (
            <div className="center-container">
              <h2>Please connect your wallet to continue</h2>
            </div>
          )}

          {!web3 && !error && (
            <div className="center-container">
              <CircularProgress />
            </div>
          )}
        </Container>
      </>
    );
  }
}

export default App;
