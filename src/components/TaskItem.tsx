import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Checkbox, IconButton, InputBase } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { TodoProp } from '../pages/Todo';
import { useAppToast } from '../context-providers/Toast';

const UPSERT_TODO = gql`mutation (
  $id: ID!, 
  $task: String!,
  $done: Boolean!,
) {
  updateTodo(
      id: $id
      task: $task
      done: $done
  ){
    id
    task
    done
  }
}`;

const DELETE_TODO = gql`mutation (
  $id: ID!,
) {
  removeTodo(
      id: $id
  ){
    id
  }
}`;

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
    padding: '6px 0'
  },
  iconButton: {
    padding: 10,
  }
}));

interface TodoItemProp extends TodoProp {
  onTodoDeleted: Function
}

const TaskItem: React.FC<TodoItemProp> = (props) => {
  const { task, id, done, onTodoDeleted } = props;
  const [showToast] = useAppToast();
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [taskDone, setTaskDone] = useState(done);
  const [taskTxt, setTaskTxt] = useState(task);
  const [updateTodo] = useMutation(UPSERT_TODO, {
    onCompleted: (data) => {
      showToast({
        severity: "success",
        message: "Todo updated successfully"
      });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: "Failed to update Todo"
      });
    }
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: (data) => {
      onTodoDeleted(data.removeTodo.id);
      showToast({
        severity: "success",
        message: "Todo deleted successfully"
      });
    },
    onError: (error) => {
      showToast({
        severity: "error",
        message: "Failed to delete Todo"
      });
    }
  });
  const handleToggle = () => {
    setTaskDone((previousValue: boolean) => {
      updateTodo({
        variables: {
          id,
          task: taskTxt,
          done: !previousValue
        }
      });
      return !previousValue;
    });
  }
  const handleDelete = () => {
    deleteTodo({
      variables: {
        id
      }
    });
  }
  const updateItem = () => {
    updateTodo({
      variables: {
        id,
        task: taskTxt,
        done: taskDone
      }
    });
  }
  return (
      <Box className={classes.root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Checkbox 
          checked={taskDone}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': "id" }}
          onClick={handleToggle}
        />
        <InputBase
          className={classes.input}
          value = {taskTxt}
          onChange = {e => setTaskTxt(e.target.value)}
          inputProps={{ 'aria-label': 'Add todo' }}
          onBlur={updateItem}
        />
        {hover && <IconButton className={classes.iconButton} aria-label="directions" onClick={handleDelete}>
          <Close />
        </IconButton>}
      </Box>
  );
}

export default TaskItem;
