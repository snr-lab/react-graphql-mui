import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

const Login: React.FC = () => {
  const classes = useStyles();

  return (
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Add todo"
          inputProps={{ 'aria-label': 'Add todo' }}
        />
        <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions">
          <Add />
        </IconButton>
      </Paper>
  );
}

export default Login;
