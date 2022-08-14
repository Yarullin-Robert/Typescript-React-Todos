import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
export const addNewTodo = createAsyncThunk<Todo, string, {rejectValue: string}>(
	'todos/addNewTodo',
	async function (text,{rejectWithValue}){
		const todo = {
			userId: 1,
			title:text,
			completed:false
		}
		const response = await fetch(todoUrl,{
			method:'POST',
			headers:{
				'content-type':'application/json'
			},
			body: JSON.stringify(todo)
		})
		if (!response.ok){
			return rejectWithValue('Can`t add task. Server error!')
		}
		return (await response.json()) as Todo

	}
);
export const toggleTodo = createAsyncThunk<Todo, string, {rejectValue: string, state: {todos: TodosState}}>(
	'todos/toggleTodo',
	async function (id,{rejectWithValue, getState}) {
		const todo = getState().todos.list.find(todo => todo.id === id)
		if(todo){
			const response = await fetch(todoUrl+'/'+id,{
				method: 'PATCH',
				headers:{
					'Content-type':'application/json'
				},
				body: JSON.stringify({
					completed: !todo.completed
				})
			})
			if (!response.ok) rejectWithValue('Can`t toggle status. Server error!')
			return await response.json() as Todo
		}
		return rejectWithValue('No such Todo in the list!')
	}
)
export const deleteTodo = createAsyncThunk<string, string, {rejectValue: string}>(
	'todos/deleteTodo',
	async function (id,{rejectWithValue}) {
		const response = await fetch(todoUrl + '/' + id, {
				method: 'DELETE'
			}
		)
		if (!response.ok) rejectWithValue('Can`t delete Todo. Server error!')
		return id
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
	reducers: {
		// addTodo(state, action: PayloadAction<string>) {
		// 	state.list.push({
		// 		id: new Date().toISOString(),
		// 		title:action.payload,
		// 		completed:false
		// 	})
		// },
		// toggleComplete(state, action: PayloadAction<string>) {
		// 	const toggledTodo = state.list.find(todo => todo.id === action.payload)
		// 	if(toggledTodo){
		// 		toggledTodo.completed = !toggledTodo.completed
		// 	}
		// },
		// removeTodo(state, action: PayloadAction<string>) {
		// 	state.list = state.list.filter(todo => todo.id !== action.payload)
		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				console.log(action.type)
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.list = action.payload
				state.loading = false
			})
			.addCase(addNewTodo.pending, (state, action)=> {
				console.log(action.type)
				state.error = null
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				state.list.push(action.payload)
			})
			.addCase(toggleTodo.pending, (state, action) => {
				console.log(action.type)
				state.error = null
			})
			.addCase(toggleTodo.fulfilled, (state, action) => {
				const toggledTodo = state.list.find(todo => todo.id === action.payload.id)
				if (toggledTodo) {
					toggledTodo.completed = !toggledTodo.completed
				}
			})
			.addCase(deleteTodo.pending, (state, action) => {
				console.log(action.type)
				state.error = null
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.list = state.list.filter(todo => todo.id !== action.payload)
			})
			.addMatcher(isError, (state, action: PayloadAction<string>) => {
				state.error=action.payload
				state.loading = false
			})
	},
});

// export const { } =
// 	todoSlice.actions;

export default todoSlice.reducer;

function isError(action: AnyAction) {
	return action.type.endsWith('rejected')
}