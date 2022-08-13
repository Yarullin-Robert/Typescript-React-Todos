import {useAppSelector} from "../hooks/hooks";
import TodoItem from "./TodoItem";
import React from "react";

const TodoList: React.FC = () => {
    const todos = useAppSelector(state => state.todos.list)
  return(
      <>
          {todos.map(todo=><TodoItem key={todo.id} {...todo}/>)
          }
      </>
  )
}

export default TodoList