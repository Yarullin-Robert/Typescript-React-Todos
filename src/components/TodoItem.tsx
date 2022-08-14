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
        <li className={"border rounded-full flex flex-row justify-between items-center bg-blue-200 px-4 py-2 gap-1"} >
            <input type="checkbox" checked={completed} className={''} onChange={()=>dispatch(toggleTodo(id))}/>
            <span>{title}</span>
            <button className={'text-red-500 text-xl'} onClick={()=>dispatch(deleteTodo(id))} >&times;</button>
        </li>
    )
}

export default  TodoItem