import React, {ChangeEvent} from "react";
import {FilterValueType} from "./AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    filter: string
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function ToDoList(props: PropsType) {


    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleValue = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox color='primary'
                                      checked={t.isDone}
                                      onChange={onChangeIsDoneValue}
                            /> <EditableSpan title={t.title} onChange={onChangeTitleValue}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color='default'
                >All
                </Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color='primary'
                >Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color='secondary'
                >Completed
                </Button>
            </div>
        </div>
    )
}

