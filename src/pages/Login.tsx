import React from "react";
import {Link} from "react-router-dom";


const Login: React.FC = () => {
	return (
		<>
			<form className={'flex flex-col gap-1 w-1/2'}>
				<span className={'self-center'}>Login</span>
				<input type={'email'} required placeholder={'email'} className={'border rounded-full px-4 py-2'}/>
				<input type={'password'} required placeholder={'password'} className={'border rounded-full px-4 py-2'}/>
				<button type={'submit'} className={'border rounded-full px-2 py-1 bg-blue-200'}>Login</button>
				<Link to={'Sign_up'} className={'border rounded-full px-2 py-1 bg-blue-200 text-center'}>Create account</Link>
			</form>

		</>
	)
}

export default Login