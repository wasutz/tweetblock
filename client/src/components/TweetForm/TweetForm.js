import React, {useState}  from 'react';
import {Card, CardContent, CardActions, FormControl, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';

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
    const [images, onDropImage] = useState([]);

    const onClickTweet = async () => {
        await onSubmit(message, images[0]);
        onChangeTweetMessage('');
        onDropImage([]);
    };

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
                <ImageUploader
                    fileContainerStyle={{
                        padding: '0 0 0 0.5rem',
                        margin: 0,
                        boxShadow: 'none',
                        display: 'block'
                    }}
                    buttonStyles={{
                        background: '#3f51b5',
                        textTransform: 'uppercase',
                        display: images.length > 0 ? 'none' : 'block'
                    }}
                    buttonText={'Media'}
                    singleImage={true}
                    withIcon={false}
                    withLabel={false}
                    withPreview={images.length > 0}
                    onChange={value => onDropImage(
                        value.length > 0 ? [...images, ...value] : [])} />
                <Button
                    className={classes.tweetButton}
                    variant="contained"
                    color="primary"
                    onClick={onClickTweet}>
                    Tweet
                </Button>
            </CardActions>
        </Card>
    );
}

export default TweetForm;