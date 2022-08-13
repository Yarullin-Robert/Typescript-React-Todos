import React from "react";
import {useAppDispatch} from "../hooks/hooks";
import {removeTodo, toggleComplete} from "../redux/todoSlice";

interface TodoItemProps {
    id: string
    title: string
    completed: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({id,title,completed}) => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <input type="checkbox" checked={completed} onChange={()=>dispatch(toggleComplete(id))}/>
            <span>{id}</span>
            <span>{title}</span>
            <span onClick={()=>dispatch(removeTodo(id))} >&times;</span>
        </div>
    )
}

export default  TodoItem