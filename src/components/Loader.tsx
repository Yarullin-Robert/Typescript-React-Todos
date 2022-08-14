import React from "react";
import loader from '../images/loader.svg'


const Loader: React.FC = () => {
  return <img src={loader} className={'w-10 h-10 self-center'} alt="loader"/>
}
export default Loader