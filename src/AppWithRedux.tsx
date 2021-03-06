import React, { useCallback } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';



export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)




    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id];
                            let tasksForTodoList = allTodoListTasks;

                           

                            return <Grid item>
                                <Paper style={{ padding: "10px" }}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
