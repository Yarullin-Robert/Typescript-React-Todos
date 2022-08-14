import React from "react";
import NavLink from "./NavLink";

const Header:React.FC = () => {
  return(
		<header className={'min-h-min w- flex justify-between px-4 py-2 bg-blue-200'}>
			<span>Logo</span>
			<nav className={'flex gap-1'}>
				<NavLink url={'/'} name={'users'}/>
				<NavLink url={'/'} name={'todos'}/>
			</nav>
		</header>
	)
}

export default Header