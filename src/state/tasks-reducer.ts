import { TasksStateType } from '../AppWithRedux';
import { v1 } from 'uuid';
import { AddTodoListActionType, RemoveTodoListActionType } from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todoListId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todoListId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType;


const initialState: TasksStateType = {
    
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state };
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.todoListId];
            const newTask = { id: v1(), title: action.title, isDone: false };
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = { ...state };

            let tasks = stateCopy[action.todoListId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            state[action.todoListId] = [...tasks]
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = { ...state };

            let tasks = stateCopy[action.todoListId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            state[action.todoListId] = [...tasks]
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = { ...state };

            stateCopy[action.todoListId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todoListId, taskId }
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todoListId }
}
export const changeTaskStatusAC = (taskId: string,
    isDone: boolean,
    todoListId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todoListId, taskId }
}
export const changeTaskTitleAC = (taskId: string,
    title: string,
    todoListId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todoListId, taskId }
}

