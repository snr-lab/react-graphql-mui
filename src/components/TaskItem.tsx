import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Checkbox, IconButton, InputBase, Paper} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
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
  const [focus, setFocus] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((previousValue: boolean) => {
      return !previousValue;
    });
  }

  const handleDelete = () => {
    console.log("Delete item");
  }

  return (
      <Box className={classes.root}>
        <Checkbox 
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': "id" }}
          onClick={handleToggle}
        />
        <InputBase
          className={classes.input}
          placeholder="Add todo"
          inputProps={{ 'aria-label': 'Add todo' }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <IconButton className={classes.iconButton} aria-label="directions" onClick={handleDelete}>
          {focus && <Close />}
        </IconButton>
      </Box>
  );
}

export default Login;
