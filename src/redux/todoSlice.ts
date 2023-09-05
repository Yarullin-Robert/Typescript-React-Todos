import { AnyAction,createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoFire, deleteTodoFire, getTodos, updateTodoFire} from "../firebase";
import {ITodo} from "../components/types/types";

type Todo = {
	id: string
	title: string
	completed: boolean
}

type TodosState = {
	loading: boolean
	error:string | null
	list: Todo[]
}

const todoUrl = `https://jsonplaceholder.typicode.com/todos`

export const fetchTodos = createAsyncThunk<Todo[], void, {rejectValue: string}>(
	"todos/fetchTodos",
	async function (_,{rejectWithValue}) {
		const response = await fetch(todoUrl + '?_limit=10');
		if (!response.ok){
			return rejectWithValue('Server Error!')
		}
		return await response.json();
	}
);

export const addNewTodo = createAsyncThunk<string, {uId:string,title:string}, {rejectValue: string}>(
	'todos/addNewTodo',
	async function ({uId,title},{rejectWithValue}){
		await addTodoFire(uId,title)
		console.log('Adding new todo to Firebase finished')
		return uId
	}
);
export const toggleTodo = createAsyncThunk<string, {uId:string, id:string }, {rejectValue: string, state: {todos: TodosState}}>(
	'todos/toggleTodo',
	async function ({uId, id},{rejectWithValue, getState}) {
		const todo = getState().todos.list.find(todo => todo.id === id)
		todo && await updateTodoFire(uId, id,{completed:!todo.completed})
		return id
	}
)
export const deleteTodo = createAsyncThunk<string, {uId:string,id:string}, {rejectValue: string}>(
	'todos/deleteTodo',
	async function ({uId,id},{rejectWithValue}) {
		await deleteTodoFire(uId,id)
		return id
	}
)
export const fetchTodosFire = createAsyncThunk<ITodo[],string, {rejectValue: string}>(
	'todos/fetchTodosFire',
	async (uId,{rejectWithValue}) => {
		const data = await getTodos(uId)
		if (!data) rejectWithValue('Can`t resolve todos from firestore')
		return data as ITodo[]
	}
)
const initialState: TodosState = {
	loading:false,
	error:null,
	list: []
}

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodosFire.pending, (state, action)=>{
				console.log(action.type)
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodosFire.fulfilled, (state, action)=>{
				console.log(action.type)
				state.list = action.payload
				state.loading = false
			})
			.addCase(fetchTodos.pending, (state, action) => {
				console.log(action.type)
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				console.log(action.type)
				state.list = action.payload
				state.loading = false
			})
			.addCase(addNewTodo.pending, (state, action)=> {
				console.log(action.type)
				state.error = null
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				console.log(action.type)
				// state.list.push(action.payload)
			})
			.addCase(toggleTodo.pending, (state, action) => {
				console.log(action.type)
				state.error = null
			})
			.addCase(toggleTodo.fulfilled, (state, action) => {
				console.log(action.type)
				const toggledTodo = state.list.find(todo => todo.id === action.payload)
				toggledTodo && (toggledTodo.completed = !toggledTodo.completed)
			})
			.addCase(deleteTodo.pending, (state, action) => {
				console.log(action.type)
				state.error = null
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				console.log(action.type)
				state.list = state.list.filter(todo => todo.id !== action.payload)
			})
			.addMatcher(isError, (state, action: PayloadAction<string>) => {
				state.error=action.payload
				state.loading = false
			})
	},
});

// export const {} = todoSlice.actions
export default todoSlice.reducer;

function isError(action: AnyAction) {
	return action.type.endsWith('rejected')
}