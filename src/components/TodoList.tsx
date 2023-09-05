import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import TodoItem from "./TodoItem";
import React, {useState} from "react";
import Loader from "./Loader";
import Modal from "./modals/Modal";
import {deleteTodo, toggleTodo} from "../redux/todoSlice";
import useAuth from "../hooks/useAuth";
import {updateTodoFire} from "../firebase";

const TodoList: React.FC = () => {
	const uId = useAuth().id
	const dispatch = useAppDispatch()
	const todos = useAppSelector(state => state.todos)
	const [modal, setModal] = useState(false)
	const [modalId, setModalId] = useState('')
	const handleSubmit = () => {
		setModal(false)
		uId && dispatch(deleteTodo({uId:uId, id:modalId}))
		setModalId('')
	}
	const handleReset = () => {
		setModal(false)
		setModalId('')
	}
	const handleChange = (id:string) => {
		uId && dispatch(toggleTodo({uId, id}))
	}
	const handleDelete = (id:string) => {
		setModal(true)
		setModalId(id)
	}
	return(
		<ul className={'flex flex-col gap-1 '} >
			{modal && <Modal open={modal} handleSubmit={handleSubmit} handleReset={handleReset}/>}
			{todos.loading && <Loader/> }
			{todos.list.map(todo=><TodoItem handleChange={handleChange} handleDelete={handleDelete} key={todo.id} {...todo}/>)
			}
		</ul>
	)
}

export default TodoList