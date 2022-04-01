import { Checkbox, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import React, { useCallback } from "react"
import { ChangeEvent } from "react"
import { EditableSpan } from "./EditableSpan"
import { TaskType } from "./TodoList"

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    t: TaskType
    todoListId: string
}
 
export const Task = React.memo((props:TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.t.id, props.todoListId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.t.id, newIsDoneValue, props.todoListId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.t.id, newValue, props.todoListId);
    },[props.changeTaskTitle, props.t.id, props.todoListId])


    return <div key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.t.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.t.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>

})