import React from "react";
import {Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {deleteCookie, useAppDispatch} from "../hooks/hooks";
import {removeUser} from "../redux/userSlice";


const HomePage:React.FC = () => {
	const dispatch = useAppDispatch()
	const {isAuth, email} = useAuth()
	const handleClick = () => {
	  deleteCookie('email')
		deleteCookie('password')
		dispatch(removeUser())
	}
  return isAuth
		?(
			<>
				<h1>Welcome {email}</h1>

				<button onClick={handleClick}>log out from {email}</button>
			</>
		)
		:(<Navigate to={'/login'} />)
}

export default HomePage