import React from 'react';
import TodoPage from "./pages/TodoPage";
import Header from "./components/Header";
import {Route, Routes} from "react-router";
import Login from "./pages/Login";

function App() {

	return (
		<div className={'gap-1 flex flex-col bg-gray-100'}>
			<Header/>
			<main className={'container mx-auto flex gap-1 flex-col items-center'}>
				<Routes>
					<Route path={'login'} element={<Login/>}/>
					<Route path={'/'} element={<TodoPage/>}/>
				</Routes>
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
