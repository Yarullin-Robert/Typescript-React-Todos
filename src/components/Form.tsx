import {FC, FormEvent, useEffect, useState} from "react";
import useAuth from "../hooks/useAuth";
import {getCookie, setCookie} from "../hooks/hooks";

interface FormProps {
	title: string
	handleClick: (email: string, password: string) => void
}

const Form: FC<FormProps> = ({title, handleClick}) => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleClick(email, pass)
	}

	return (
		<form className={'flex flex-col gap-1'} onSubmit={e=>handleSubmit(e)}>
			<span className={'self-center'}>{title}</span>
			<input required
						 type={'email'}
						 name={'email'}
						 placeholder={'email'}
						 className={'border rounded-full px-4 py-2'}
						 value={email}
						 autoComplete={'on'}
						 onChange={e => {
							 setEmail(e.target.value)
						 }}
			/>
			<input required
						 type={'password'}
						 name={'password'}
						 placeholder={'password'}
						 className={'border rounded-full px-4 py-2'}
						 value={pass}
						 autoComplete={'on'}
						 onChange={e => {
							 setPass(e.target.value)
						 }}
			/>
			<button type={"submit"} onClick={() => handleClick(email, pass)}>{title}</button>
		</form>
	)
}

export default Form