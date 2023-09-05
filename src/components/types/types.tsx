export interface ITodo {
	title:string
	completed:boolean
	id:string
}
export interface IUser {
	email: string | null
	id:string
	token:string
}