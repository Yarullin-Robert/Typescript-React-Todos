import React from "react";

interface NewTodoFormProps {
    value:string
    updateText: (str:string)=>void
    handleAction: ()=>void
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({value, updateText, handleAction}) => {

    return (
      <label>
          <input className={'py-2 px-4 border-black rounded-full outline-none'} placeholder='new todo' value={value} onChange={e=>updateText(e.target.value)}/>
          <button className={'py-2 px-4'} onClick={()=>handleAction()}>Add new task </button>
      </label>
  )
}
export default NewTodoForm