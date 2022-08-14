import React, {useState} from 'react'
import NewTodoForm from "../components/NewTodoForm";
import TodoList from "../components/TodoList";
import {useAppDispatch} from "../hooks/hooks";
import {addNewTodo} from "../redux/todoSlice";

const TodoPage: React.FC = () => {
    const [text,setText] = useState('')
    const dispatch = useAppDispatch()
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