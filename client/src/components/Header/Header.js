import React from 'react';
import {AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
    menus: {
      marginLeft: 'auto'
    },
    menu: {
      textDecoration: 'none',
      color: '#fff'
    }
}));

const Header = ({tokenBalance}) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <a href="/" className={classes.menu}>
                    <Typography variant="h6">
                    Tweet Block
                    </Typography>
                </a>
                <div className={classes.menus}>
                    <Button color="inherit">Your TWT: {tokenBalance}</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;