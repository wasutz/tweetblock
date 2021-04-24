import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

const Tweet = ({tweet}) => {
  return (
    <Card>
        <CardContent>
            <Typography component="body2" variant="p">
                {tweet.address}
            </Typography>
            <Typography component="body2" variant="p">
                {tweet.message}
            </Typography>
        </CardContent>
    </Card>
  );
}

export default Tweet;