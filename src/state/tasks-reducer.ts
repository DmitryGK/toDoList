import {FilterValueType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type Action2Type = {
    type: '2'
    title: string
}


export type ActionsType = RemoveTaskActionType | Action2Type
export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case '2': {
            return {...state}
        }
        default:
            new Error('error')
    }


}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type : "REMOVE-TASK", todolistId, taskId}
}
export const acton2AC = (title: string): Action2Type => {
    return {type: "2", title: title}
}
