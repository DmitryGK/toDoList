import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {MenuSharp} from "@material-ui/icons";
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListsReducer } from './state/todoLists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer'


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppWithReducers() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer( tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React book', isDone: true}
        ]

    })

    function removeTodoList(todoListId: string) {
        const action = removeTodoListAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }


    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
        
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatchToTasksReducer(action)
    
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        dispatchToTodoListsReducer(changeTodoListFilterAC(value, todoListId))

    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        const action = changeTodoListTitleAC(newTitle, todoListId)
        dispatchToTodoListsReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }


    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MenuSharp/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id]
                            let tasksForTodoList = allTodoListTasks

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTodoListTasks.filter((t: { isDone: any; }) => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodoListTasks.filter((t: { isDone: any; }) => t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList
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

export default AppWithReducers;
