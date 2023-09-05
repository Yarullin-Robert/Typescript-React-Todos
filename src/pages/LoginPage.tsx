import React from "react";
import {Link} from "react-router-dom";
import Form from "../components/Form";

interface LoginPageProps {
	handleLogin: (email: string, password: string) => void
}

const LoginPage: React.FC<LoginPageProps> = ({handleLogin}) => {
	return (
		<div className={'flex flex-col gap-1 w-1/2'}>
			<Form title={'Login'} handleClick={handleLogin} />
			<Link to={'/signup'} className={'button'}>Create account</Link>
		</div>
	)
}

export default LoginPage