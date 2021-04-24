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
            <Typography component="p" variant="subtitle1" className={classes.owner}>
                {tweet.owner}
            </Typography>
            <Typography component="p" variant="subtitle2">
                {tweet.message}
            </Typography>
        </CardContent>
    </Card>
  );
}

export default Tweet;