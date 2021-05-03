import React from 'react';
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
  tweetCard: {
    marginTop: '1rem',
  },
  tweetImage: {
    height: '256px'
  },
  owner: {
    paddingBottom: '1rem'
  }
}));

const Tweet = ({tweet}) => {
  const classes = useStyles();

  return (
    <Card className={classes.tweetCard}>
        <CardHeader subheader={`Owner ${tweet.owner}`}/>
        {tweet.image && (
          <CardMedia
            className={classes.tweetImage}
            image={`https://ipfs.io/ipfs/${tweet.image}`} />
        )}
        <CardContent>
            <Typography component="p" variant="subtitle2">
                {tweet.message}
            </Typography>
        </CardContent>
    </Card>
  );
}

export default Tweet;