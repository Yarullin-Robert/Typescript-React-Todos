import React from "react";
import {useAppDispatch} from "../hooks/hooks";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import Form from "../components/Form";
import {Link, useNavigate} from "react-router-dom";
import {setUser} from "../redux/userSlice";

const SignUpPage: React.FC = () => {
	const push = useNavigate()
	const dispatch = useAppDispatch()
	const handleSignUp = (email: string, password: string) => {
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email, password)
			.then(({user})=>{
				console.log(user)
				dispatch(setUser({
					email: user.email,
					id: user.uid,
					token: user.refreshToken
				}))
				push('/')
		})
			.catch(console.error)
	}
	return (
		<div className={'flex flex-col gap-1 w-1/2'}>
			<Form title={'Sign up'} handleClick={handleSignUp}/>
			<Link to={'/login'} className={'button'}>Already has an account?</Link>
		</div>
	)
}

export default SignUpPage