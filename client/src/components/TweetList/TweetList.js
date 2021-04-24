import React  from 'react';
import Tweet from '../Tweet/Tweet';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
    tweetListContainer: {
      padding: '1rem 0'
    }
}));

const TweetList = ({tweets}) => {
    const classes = useStyles();

    return (
        <div className={classes.tweetListContainer}>
           {tweets.map(tweet => (
                <Tweet key={tweet.id} tweet={tweet} />
           ))}
        </div>
    );
}

export default TweetList;