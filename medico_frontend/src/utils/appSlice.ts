import {createSlice} from "@reduxjs/toolkit"
import { AdminType, DoctorType, UserType } from "./types";
import { DoctorMessageDocument, UserMessageDocument } from "../context/SocketContext";

interface AppState {
    darkMode: boolean;
    user: UserType | {};
    admin: AdminType | {};
    doctor: DoctorType | {};
    adminDataReload: boolean;
    selectedChatData: UserType | DoctorType | undefined;
    selectedChatMessages: UserMessageDocument[] | DoctorMessageDocument[] | []
    
}   



const initialState: AppState = {
    darkMode: false,
    user:{},
    admin:{},
    doctor:{},
    selectedChatData:undefined,
    selectedChatMessages:[],
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
        addMessages: (state, action) =>{
               state.selectedChatMessages = [...state.selectedChatMessages,{
                ...action.payload,
                sender: action.payload.sender._id || action.payload.sender,
                recipient: action.payload.recipient._id || action.payload.recipient
               }]

               console.log("this new selectedChatMessages", action.payload, state.selectedChatMessages)
        }


    }
})



export const {toggleDarkMode,saveUser, saveDoctor,toggleAdminDataReload, saveAdmin, addMessages} = appSlice.actions    
export default appSlice.reducer