import { tasksReducer } from './tasks-reducer';
import { todoListsReducer } from './todolists-reducer';
import { combineReducers, createStore } from "redux";



const rootReducer = combineReducers ({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


//@ts-ignore
window.store = store