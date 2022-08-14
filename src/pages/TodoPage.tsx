import React, {useEffect, useState} from 'react'
import NewTodoForm from "../components/NewTodoForm";
import TodoList from "../components/TodoList";
import {useAppDispatch} from "../hooks/hooks";
import {addNewTodo, fetchTodos} from "../redux/todoSlice";

const TodoPage: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(fetchTodos())
    },[dispatch])
    const [text,setText] = useState('')
    const updateText = (e:string) => setText(e)
    const handleAction = () => {
        if (text.trim().length){
            dispatch(addNewTodo(text))
            setText('')
        }
    }
    return (
        <>
            <NewTodoForm value={text} handleAction={handleAction} updateText={updateText}/>
            <TodoList/>
        </>
    )
}

export default  TodoPage