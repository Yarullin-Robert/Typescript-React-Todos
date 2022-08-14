import React from "react";
import {Link} from "react-router-dom";

interface LinkProps {
	name:string
	url:string
}
const NavLink: React.FC<LinkProps> = ({name, url}) => {
  return <Link className={'mx-2 my-1 font-bold uppercase'} to={url} >{name}</Link>

}

export default NavLink