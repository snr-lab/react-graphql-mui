import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useAppToast } from '../context-providers/Toast';

const UPSERT_TODO = gql`mutation (
  $task: String!,
  $done: Boolean!,
) {
  createTodo(
      task: $task
      done: $done
  ){
    id
    task
    done
  }
}`;

interface TaskFormProps {
  onTodoAdded: Function
}

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

const TaskForm: React.FC<TaskFormProps> = (props) => {
  const {onTodoAdded} = props;
  const [showToast] = useAppToast();
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [addTodo, { loading: adding }] = useMutation(UPSERT_TODO, {
    onCompleted: (data) => {
      onTodoAdded(data);
      showToast({
        severity: "success",
        message: "Todo added successfully"
      });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: "Failed to add Todo"
      });
    }
});
  const addNewTodo = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    if(task !== ""){
      addTodo({
        variables: {
          task: task,
          done: false
        }
      });
      setTask("");
    }
  }
  return (
      <Paper component="form" className={classes.root} onSubmit={e => addNewTodo(e)}>
        <InputBase
          className={classes.input}
          placeholder="Add todo"
          value = {task}
          onChange = {e => setTask(e.target.value)}
          inputProps={{ 'aria-label': 'Add todo' }}
        />
        <IconButton type="submit" color="primary" className={classes.iconButton} aria-label="directions">
          <Add />
        </IconButton>
      </Paper>
  );
}

export default TaskForm;
