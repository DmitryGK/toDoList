import React from 'react';
import './App.css';
import {ToDolist} from "./ToDolist";

function App() {

    const task1 = [
        {id:1, title: 'HTML&CSS', isDone: true},
        {id:2, title: 'JS', isDone: true},
        {id:3, title: 'ReactJS', isDone: false}
    ]
    const task2 = [
        {id:1, title: 'Hello world', isDone: true},
        {id:2, title: 'I am happy', isDone: true},
        {id:3, title: 'Yo', isDone: true}
    ]

    return (
        <div className="App">
            <ToDolist title='What to learn' tasks={task1}/>
            <ToDolist title='Songs' tasks={task2}/>
        </div>
    );
}

export default App;
