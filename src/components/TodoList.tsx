import {useAppSelector} from "../hooks/hooks";
import TodoItem from "./TodoItem";
import React from "react";
import Loader from "./Loader";

const TodoList: React.FC = () => {
	const todos = useAppSelector(state => state.todos)
	return(
		<ul className={'flex flex-col gap-1 '} >
			{todos.loading && <Loader/> }
			{todos.list.map(todo=><TodoItem key={todo.id} {...todo}/>)
			}
		</ul>
	)
}

export default TodoList