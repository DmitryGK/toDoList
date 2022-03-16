import React, {useState} from 'react';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../AppWithRedux';

test('correct todoList should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New TodoList";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todoList should change its name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New TodoList";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]


    const action = changeTodoListTitleAC(todoListId2, newTodoListTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todoList should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const action = changeTodoListFilterAC(todoListId2, newFilter);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



