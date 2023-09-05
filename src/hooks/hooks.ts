import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux";

interface IOptions {
	path?:string
	secure?:boolean
	'max-age'?: number
	expires?: typeof Date | string
}
type setCookie = (name:string, value:string, options?:IOptions) => void
type getCookie = (name:string) => string | undefined
type deleteCookie = (name:string) => void


export const getCookie:getCookie = (name)=> {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
export const setCookie:setCookie = (name, value, options?) => {

	options = {
		path: '/',
		// при необходимости добавьте другие значения по умолчанию
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	console.log(options)
	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		console.log(optionKey)
		let optionValue = eval(`options['${optionKey}']`) ;
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}
export const deleteCookie:deleteCookie = (name) => {
	setCookie(name, "",{'max-age':-1})
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()