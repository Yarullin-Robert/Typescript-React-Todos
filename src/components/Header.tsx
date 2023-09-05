import React from "react";
import HeaderLink from "./HeaderLink";
import useAuth from "../hooks/useAuth";

const Header: React.FC = () => {
	const {isAuth} = useAuth()
	return (
		<header className={'min-h-min w- flex justify-between px-4 py-2 bg-blue-200'}>
			<span>Logo</span>
			{
				isAuth
					? <nav className={'flex gap-1'}>
						<HeaderLink url={'/'} name={'users'}/>
						<HeaderLink url={'/todo'} name={'todos'}/>
					</nav>
					: <nav className={'flex gap-1'}>
						<HeaderLink url={'/login'} name={'SignIn'}/>
						<HeaderLink url={'/signup'} name={'SignUp'}/>
					</nav>
			}


		</header>
	)
}

export default Header