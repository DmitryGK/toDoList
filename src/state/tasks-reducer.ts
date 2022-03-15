import {FilterValueType, TasksStateType, TodoListType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoLists-reducer";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todoListId: string
    isDone: boolean
    taskId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todoListId: string
    title: string
    taskId: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            state[action.todoListId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            let task = tasks.find(t => t.id = action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            let task = tasks.find(t => t.id = action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todoListId] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            new Error('error')
    }


}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type : "REMOVE-TASK", todoListId, taskId}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todoListId}
}

