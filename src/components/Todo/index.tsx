import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Container, CssBaseline, Typography } from '@material-ui/core';
import { ListAlt } from '@material-ui/icons';

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

const Login: React.FC = () => {
    const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ListAlt />
        </Avatar>
        <Typography component="h1" variant="h5">
          Todo List
        </Typography>
        <form className={classes.form} noValidate>
          
        </form>
      </div>
    </Container>
  );
}

export default Login;
