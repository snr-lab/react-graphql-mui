import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CssBaseline, LinearProgress, List, ListItem, Paper, Typography } from '@material-ui/core';
import { ListAlt } from '@material-ui/icons';
import TaskForm from '../../components/TaskForm';
import TaskItem from '../../components/TaskItem';

const GET_TODOS = gql`
  query {
      allTodos {
      id
      task
      done
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressBar: {
    minHeight: 4
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
    minHeight: 60
  },
  list: {
    width: "100%"
  },
  listItem: {
    padding: 0
  }
}));

export interface TodoProp {
  id: number
  task: string
  done: boolean
}

const Todo: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data: todoList, refetch } = useQuery(GET_TODOS);
  const [newTodoId, setNewTodoId] = useState(0);
  useEffect(() => {
    if(todoList && todoList.allTodos.length > 0){
      const latestItem = todoList.allTodos.reduce((latestItem: TodoProp, currentItem: TodoProp) => {
          if(latestItem.id > currentItem.id){
              return latestItem;
          }
          return currentItem;
      });
      setNewTodoId(parseInt(latestItem.id) + 1);
  }
  }, [todoList, newTodoId]);
  const onTodoListUpdated = () => {
    refetch();
  }
  return (
    <Box component="main">
      <CssBaseline />
      <Box className={classes.progressBar}>{loading && <LinearProgress />}</Box>
      <Box className={classes.paper} maxWidth="xs">
        <Avatar className={classes.avatar}>
          <ListAlt />
        </Avatar>
        <Typography component="h1" variant="h5">
          Todo List
        </Typography>
        <TaskForm newTodoId={newTodoId} onTodoAdded={onTodoListUpdated} />
        <Paper className={classes.listRoot}>
          <List className={classes.list}>
            {todoList && todoList.allTodos.map((todo: TodoProp) => {
              return (
                <ListItem className={classes.listItem} key={todo.id} role={undefined}>
                  <TaskItem task={todo.task} id={todo.id} done={todo.done} onTodoDeleted={onTodoListUpdated} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default Todo;
