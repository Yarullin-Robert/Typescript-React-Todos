import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const todoUrl = `https://jsonplaceholder.typicode.com/todos_limit=10`

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async function () {
        const response = await fetch(todoUrl);
        return await response.json();
    }
);

type Todo = {
    id: string
    title: string
    completed: boolean
}

type TodosState = {
    list: Todo[]
}

const initialState: TodosState = {
    list: [{id:'1',completed:false,title:''}]
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: new Date().toISOString(),
                title:action.payload,
                completed:false
            })
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload)
            if(toggledTodo){
                toggledTodo.completed = !toggledTodo.completed
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        }
    },
    // extraReducers: {
    //     [fetchTodos.pending]: (state, action) => {
    //         state.status = `pending`
    //         state.error = null
    //     },
    //     [fetchTodos.fulfilled]: (state, action) => {
    //         action.payload.map((e) => e)
    //     },
    //     [fetchTodos.rejected]: (state, action) => {
    //         state.status = `error`
    //     },
    // },
});

export const { addTodo, toggleComplete, removeTodo } =
    todoSlice.actions;

export default todoSlice.reducer;