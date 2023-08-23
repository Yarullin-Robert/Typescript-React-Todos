import React from "react";

const SignUp:React.FC = () => {
  return(
		<form className={'flex flex-col gap-1 w-1/2'}>
			<span className={'self-center'}>Sign Up</span>
			<input type={'email'} required placeholder={'email'} className={'border rounded-full px-4 py-2'}/>
			<input type={'password'} required placeholder={'password'} className={'border rounded-full px-4 py-2'}/>
			<button type={'submit'} className={'border rounded-full px-2 py-1 bg-blue-200'}>Sign Up</button>
		</form>
	)
}

export default SignUp