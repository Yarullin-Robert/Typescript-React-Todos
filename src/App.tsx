import React, {useEffect} from 'react';
import TodoPage from "./pages/TodoPage";
import {fetchTodos} from "./redux/todoSlice";
import {useAppDispatch} from "./hooks/hooks";

function App() {
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(fetchTodos())
    },[dispatch])
  return (
    <div className={'container mx-auto'}>
      <header className=' '></header>
      <main className={'flex flex-col items-center'}>
        <TodoPage />
      </main>
      <footer ></footer>
    </div>
  );
}

export default App;
