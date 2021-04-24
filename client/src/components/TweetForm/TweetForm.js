import React, {useState}  from 'react';
import {Card, CardContent, CardActions, FormControl, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
    tweetForm: {
        marginTop: '1rem',
    },
    tweetButton: {
        marginLeft: 'auto',
        marginRight: '0.5rem',
        marginBottom: '0.5rem'
    }
}));

const TweetForm = ({onSubmit}) => {
    const classes = useStyles();
    const [message, onChangeTweetMessage] = useState('');

    return (
        <Card className={classes.tweetForm}>
            <CardContent>
                <FormControl fullWidth>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={3}
                        value={message}
                        placeholder="What's happening?"
                        onChange={event => onChangeTweetMessage(event.target.value)}
                        variant="outlined" />
                </FormControl>
            </CardContent>
            <CardActions>
                <Button
                    className={classes.tweetButton}
                    variant="contained"
                    color="primary"
                    onClick={onSubmit.bind(this, message)}>
                    Tweet
                </Button>
            </CardActions>
        </Card>
    );
}

export default TweetForm;