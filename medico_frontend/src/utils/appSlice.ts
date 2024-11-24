import {createSlice} from "@reduxjs/toolkit"
import { AdminType, DoctorType, UserType } from "./types";

interface AppState {
    darkMode: boolean;
    user: UserType | {};
    admin: AdminType | {};
    doctor: DoctorType | {};
    adminDataReload: boolean;
}   



const initialState: AppState = {
    darkMode: false,
    user:{},
    admin:{},
    doctor:{},
    adminDataReload:false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state, action) => {
            state.darkMode = action.payload;
            sessionStorage.setItem("darkmode", JSON.stringify(state.darkMode));
        },
        saveUser: (state, action) =>{
            state.user = action.payload;
            
        },
        saveAdmin: (state, action) =>{
            state.admin = action.payload;
            
        },
        saveDoctor: (state, action) =>{
            state.doctor = action.payload;
            
        },
        toggleAdminDataReload: (state) => {
            state.adminDataReload = !state.adminDataReload;
            
        },


    }
})



export const {toggleDarkMode,saveUser, saveDoctor,toggleAdminDataReload, saveAdmin} = appSlice.actions    
export default appSlice.reducer