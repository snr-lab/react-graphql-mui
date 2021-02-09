import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Paper } from '@material-ui/core';
import TaskItem from './TaskItem';

const useStyles = makeStyles((theme) => ({
  root: {
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
    <Paper className={classes.root}>
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
  );
}

export default Login;
