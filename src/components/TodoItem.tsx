import React from "react";
import {useAppDispatch} from "../hooks/hooks";
import {deleteTodo, toggleTodo} from "../redux/todoSlice";

interface TodoItemProps {
    id: string
    title: string
    completed: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({id,title,completed}) => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <input type="checkbox" checked={completed} onChange={()=>dispatch(toggleTodo(id))}/>
            <span>{title}</span>
            <span onClick={()=>dispatch(deleteTodo(id))} >&times;</span>
        </div>
    )
}

export default  TodoItem