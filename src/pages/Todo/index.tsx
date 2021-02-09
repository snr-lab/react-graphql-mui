import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Container, CssBaseline, List, ListItem, Paper, Typography } from '@material-ui/core';
import { ListAlt } from '@material-ui/icons';
import TaskForm from '../../components/TaskForm';
import TaskItem from '../../components/TaskItem';

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
    listRoot: {
      marginTop: theme.spacing(1),
      padding: 0,
      display: 'flex',
      width: 400,
    },
    list: {
      width: "100%"
    },
    listItem: {
      padding: 0
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
        <TaskForm />
        <Paper className={classes.listRoot}>
          <List className={classes.list}>
            {[0, 1, 2, 3].map((value) => {
              return (
                <ListItem className={classes.listItem} key={value} role={undefined}>
                  <TaskItem />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    </Container>
  );
}

export default Login;
