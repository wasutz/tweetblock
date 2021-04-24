import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
  tweetCard: {
    marginTop: '1rem',
  },
  owner: {
    paddingBottom: '1rem'
  }
}));

const Tweet = ({tweet}) => {
  const classes = useStyles();

  return (
    <Card className={classes.tweetCard}>
        <CardContent>
            <Typography component="h5" variant="p" className={classes.owner}>
                {tweet.owner}
            </Typography>
            <Typography component="subtitle1" variant="p">
                {tweet.message}
            </Typography>
        </CardContent>
    </Card>
  );
}

export default Tweet;