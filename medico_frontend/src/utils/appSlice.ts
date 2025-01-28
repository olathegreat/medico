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

    isDownloading: boolean;
    isUploading:boolean;
    fileDownloadProgress: number;
    fileUploadProgress: number;
    directMessagesContact: UserMessageDocument[] | DoctorMessageDocument[] | []

    
}   



const initialState: AppState = {
    darkMode: false,
    user:{},
    admin:{},
    doctor:{},
    selectedChatData:undefined,
    selectedChatMessages:[],
    directMessagesContact:[],
    adminDataReload:false,
    isDownloading: false,
    isUploading:false,
    fileDownloadProgress: 0,
    fileUploadProgress: 0
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
        },
        setSelectedChatData: (state, action)=>{
            state.selectedChatData =  action.payload

            console.log("new chat selected", state.selectedChatData)
        },
        setSelectedChatMessages: (state, action)=>{
            state.selectedChatMessages = action.payload;


            
        },
        setDirectMessagesContact: (state, action) =>{
            state.directMessagesContact = action.payload

            console.log(state.directMessagesContact)
        },
        closeChat: (state)=>{
            state.selectedChatMessages=[];
            state.selectedChatData = undefined
        },
        setIsUploading: (state) =>{
            state.isUploading = !state.isUploading
        },
        setIsDownloading: (state) =>{
            state.isUploading = !state.isUploading
        },
        setFileUploadProgress: (state, action)=>{
            state.fileUploadProgress = action.payload;
        },
        setFileDownloadProgress: (state, action)=>{
            state.fileDownloadProgress = action.payload;
        }


    }
})



export const {toggleDarkMode,saveUser, saveDoctor,toggleAdminDataReload, saveAdmin, addMessages, setSelectedChatData,closeChat,setSelectedChatMessages,setFileDownloadProgress,setFileUploadProgress, setIsDownloading, setIsUploading, setDirectMessagesContact} = appSlice.actions    

export default appSlice.reducer