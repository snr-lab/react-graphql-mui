import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CssBaseline, Typography } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    }
}));

const Info: React.FC = () => {
  const classes = useStyles();
  return (
    <Box component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Info
        </Typography>
      </Box>
    </Box>
  );
}

export default Info;
