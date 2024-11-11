import {createSlice} from "@reduxjs/toolkit"

interface AppState {
    darkMode: boolean;
}   

const initialState: AppState = {
    darkMode: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})



export const {toggleDarkMode} = appSlice.actions    
export default appSlice.reducer