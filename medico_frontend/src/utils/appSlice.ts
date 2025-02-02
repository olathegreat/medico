import { createSlice } from "@reduxjs/toolkit"
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
    redirectUrl: string,
    isDownloading: boolean;
    isUploading: boolean;
    fileDownloadProgress: number;
    fileUploadProgress: number;
    directMessagesContact: UserMessageDocument[] | DoctorMessageDocument[] | []


}



const initialState: AppState = {
    darkMode: false,
    user: {},
    admin: {},
    doctor: {},
    selectedChatData: undefined,
    selectedChatMessages: [],
    directMessagesContact: [],
    adminDataReload: false,
    isDownloading: false,
    isUploading: false,
    fileDownloadProgress: 0,
    fileUploadProgress: 0,
    redirectUrl: ""
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state, action) => {
            state.darkMode = action.payload;
            sessionStorage.setItem("darkmode", JSON.stringify(state.darkMode));
        },
        saveUser: (state, action) => {
            state.user = action.payload;

        },
        saveAdmin: (state, action) => {
            state.admin = action.payload;

        },
        saveDoctor: (state, action) => {
            state.doctor = action.payload;

        },
        toggleAdminDataReload: (state) => {
            state.adminDataReload = !state.adminDataReload;

        },
        addExistingMessages: (state, action) => {
            state.selectedChatMessages = [...action.payload

            ]


            
        },
        addMessages: (state, action) => {
            state.selectedChatMessages = [...state.selectedChatMessages,


            {
                ...action.payload,
                sender: action.payload.sender,
                recipient: action.payload.recipient._id || action.payload.recipient
            }]

            
        },
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload;
            sessionStorage.setItem("sessionSelectedChatData", JSON.stringify(action.payload))

            
        },
        setSelectedChatMessages: (state, action) => {
            state.selectedChatMessages = action.payload;



        },
        setDirectMessagesContact: (state, action) => {
            state.directMessagesContact = action.payload

        
        },
        closeChat: (state) => {
            state.selectedChatMessages = [];
            state.selectedChatData = undefined;
            sessionStorage.removeItem("sessionSelectedChatData")
        },
        setIsUploading: (state) => {
            state.isUploading = !state.isUploading

        },
        setIsDownloading: (state) => {
            state.isDownloading = !state.isDownloading
        },
        setFileUploadProgress: (state, action) => {
            state.fileUploadProgress = action.payload;
            
        },
        setFileDownloadProgress: (state, action) => {
            state.fileDownloadProgress = action.payload;
            
        },
        setRedirectUrl:(state, action)=>{
            state.redirectUrl = action.payload
        }


    }
})



export const { toggleDarkMode,setRedirectUrl, saveUser, saveDoctor, toggleAdminDataReload, saveAdmin, addMessages, setSelectedChatData, closeChat, setSelectedChatMessages, setFileDownloadProgress, setFileUploadProgress, setIsDownloading, setIsUploading, setDirectMessagesContact, addExistingMessages } = appSlice.actions

export default appSlice.reducer