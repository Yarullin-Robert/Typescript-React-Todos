import React, {FC, useEffect} from 'react';
import TodoPage from "./pages/TodoPage";
import Header from "./components/Header";
import {Route, Routes} from "react-router";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import useAuth from "./hooks/useAuth";
import {setUser} from "./redux/userSlice";
import {getCookie, useAppDispatch} from "./hooks/hooks";
import {useNavigate} from "react-router-dom";
import {appSignIn} from "./firebase";
import Footer from './components/Footer';
import { setLoggedIn, setLoggingIn, } from './redux/appSlice';

const App: FC = () => {
	let loggingIn,loggedIn = false
	const {isAuth} = useAuth()
	const push = useNavigate()
	const dispatch = useAppDispatch()
	const handleLogin = async (email: string, password: string) => {
		const appUser = await appSignIn({email,password})
		console.log(appUser)
		dispatch(setLoggingIn)
		loggingIn = true
		await dispatch(setUser({
			email:appUser.email,
			id:appUser.id,
			token:appUser.token
		}))
		dispatch(setLoggedIn)
		loggedIn = true
		loggingIn = false
		// push('/')
	}

	useEffect(()=>{
		const cookieEmail = getCookie('email')
		const cookiePassword = getCookie('password')
		cookieEmail && cookiePassword && handleLogin(cookieEmail, cookiePassword)
	},[])
	return (
		<div className={'gap-1 flex flex-col bg-gray-100'}>
			<Header/>
			<main className={'container mx-auto flex gap-1 flex-col items-center'}>
				{ <Routes>
					<Route path={'/'} element={<HomePage/>}/>
					{isAuth && <Route path={'todo'} element={<TodoPage/>}/>}
					{!isAuth && <>
							<Route path={'/login'} element={<LoginPage handleLogin={handleLogin}/>}/>
						<Route path={'/signup'} element={<SignUpPage/>}/>
					</>}
				</Routes>}
			</main>
			<Footer/>
		</div>
	);
}

export default App;
