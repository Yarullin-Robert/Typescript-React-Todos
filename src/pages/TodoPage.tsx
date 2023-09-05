import React, {useEffect, useState} from 'react'
import NewTodoForm from "../components/NewTodoForm";
import TodoList from "../components/TodoList";
import {useAppDispatch} from "../hooks/hooks";
import {addNewTodo, fetchTodos, fetchTodosFire} from "../redux/todoSlice";
import {addTodoFire} from "../firebase";
import useAuth from "../hooks/useAuth";
import { get } from 'http';

const TodoPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const [title,setTitle] = useState('')
    const updateText = (e:string) => setTitle(e)
    const {id} = useAuth()
    const getFireTodos =  async () => {
        id && await dispatch(fetchTodosFire(id))
    }
    const handleAction = async () => {
        id && title.trim().length?dispatch(addNewTodo({uId:id,title:title})):alert('Type any title!')
        id && await dispatch(fetchTodosFire(id))
        setTitle('')
    }
    useEffect(() => {
        getFireTodos()
    },[])
    return (
        <>
            <NewTodoForm value={title} handleAction={handleAction} updateText={updateText}/>
            <button onClick={getFireTodos}>Firestore</button>
            <TodoList/>
        </>
    )
}

export default  TodoPage