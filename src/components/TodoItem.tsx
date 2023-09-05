import React from "react";

interface TodoItemProps {
	id: string
	title: string
	completed: boolean
	handleDelete:(id:string)=>void
  handleChange:(id:string)=>void
}

const TodoItem: React.FC<TodoItemProps> = ({id, title, completed, handleChange, handleDelete}) => {
	return (
		<li className={"border rounded-full flex flex-row justify-between items-center bg-blue-200 px-4 py-2 gap-1"}>
			<input type="checkbox" checked={completed} className={''} onChange={()=> handleChange(id)}/>
			<span>{title}</span>
			<span className={'text-red-500 text-xl cursor-pointer'} onClick={() => handleDelete(id)}>&times;</span>
		</li>
	)
}

export default TodoItem