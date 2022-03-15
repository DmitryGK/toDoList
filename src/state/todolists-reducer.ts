import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export type ActionsType =  RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [
                ...state, {
                    id: action.todoListId,
                    title: action.title,
                    filter: 'all'
                }
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if(todoList){
                todoList.title = action.title
            }
            return [...state]

        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if(todoList){
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            new Error('error')
    }


}

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type : "REMOVE-TODOLIST", id: todolistId}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todoListId: v1()}
}
export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}
export const changeTodoListFilterAC = (filter: FilterValueType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}