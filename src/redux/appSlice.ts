import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AppState {
	loggingIn: boolean;
  loggedIn: boolean;
}

const initialState: AppState = {
	loggingIn: false,
  loggedIn: false,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoggingIn(state, action: PayloadAction<AppState>) {
			state.loggingIn = true;
		},
		setLoggedIn(state) {
      state.loggingIn = false;
			state.loggedIn = true;
    }
	}
})

export  const {setLoggingIn, setLoggedIn} = appSlice.actions
export default appSlice.reducer