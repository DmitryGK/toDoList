import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'



function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id:v1(), title: 'HTML&CSS', isDone: true},
        {id:v1(), title: 'JS', isDone: true},
        {id:v1(), title: 'ReactJS', isDone: false},
        {id:v1(), title: 'Rest API', isDone: false},
        {id:v1(), title: 'GraphQL', isDone: false}

    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = { id: v1(), title:title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeFilter(value:FilterValueType) {
        setFilter(value)
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }



    return (
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />

        </div>
    );
}

export default App;
