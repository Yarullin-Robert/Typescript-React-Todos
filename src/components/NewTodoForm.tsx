import React, {FormEvent} from "react";

interface NewTodoFormProps {
    value:string
    updateText: (str:string)=>void
    handleAction: ()=>void
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({value, updateText, handleAction}) => {
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleAction()
    }
    return (
      <form onSubmit={e=>handleSubmit(e)}>
          <input name={'todoTitle'} className={''} placeholder='new todo' value={value} onChange={e=>updateText(e.target.value)}/>
          <button type={"submit"} className={'bg-cyan-500 '}>Add new task </button>
      </form>
  )
}
export default NewTodoForm