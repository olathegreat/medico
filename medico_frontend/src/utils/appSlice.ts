import {createSlice} from "@reduxjs/toolkit"
import { UserType } from "./types";

interface AppState {
    darkMode: boolean;
    user: UserType | {};
}   



const initialState: AppState = {
    darkMode: false,
    user:{}
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        },
        saveUser: (state, action) =>{
            state.user = action.payload;
        }
    }
})



export const {toggleDarkMode,saveUser} = appSlice.actions    
export default appSlice.reducer