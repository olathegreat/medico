import Nav from "../components/Nav";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import MessageHeader from "../components/MessageComponents/MessageHeader";
import MessageContainer from "../components/MessageComponents/MessageContainer";
import SendMessageBar from "../components/MessageComponents/SendMessageBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../utils/axios";
import {  setDirectMessagesContact, setSelectedChatData } from "../utils/appSlice";
import DarkModeSetterFunction from "../utils/DarkModeSetterFunction";
// import {
//   DoctorMessageDocument,
//   UserMessageDocument,
// } from "../context/SocketContext";

const MessagesPage = () => {
  // const chatData = useSelector((state: any)=> state.app.selectedChatData);
  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";
  const dispatch = useDispatch();
  const chatMessagesList = useSelector(
    (state: any) => state.app.directMessagesContact
  );

  const { selectedChatData } = useSelector((state: any) => state.app);
  const {
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useSelector((state: any) => state.app);

  useEffect(() => {
    const getUserDMMessagesList = async () => {
      try{

      
      const response = await axiosInstance.get(
        "/messages/get-user-messages-contact",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: bearerToken,
          },
        }
      );

      dispatch(setDirectMessagesContact(response.data.contacts));

      

    }catch(err){
      console.log(err)
    }
    };

    getUserDMMessagesList();
  }, []);


  const contactClicked = (contact: any) =>{
    dispatch(setSelectedChatData(contact))
  }

  const darkMode = DarkModeSetterFunction();

  return (
    <div className="">
      <Nav />

      <div className="flex flex-col sm:flex-row">
        <div className={`w-full  sm:w-[320px]  sm:shadow h-[100px] sm:h-[90vh] ${darkMode && "border-white border-b sm:border-r"} shadow-black  flex  flex-col`}>
          <h2 className="text-start py-1 sm:p-5  sm:text-2xl">Messages</h2>

          <div className="flex sm:flex-col  gap-2 sm:gap-0  overflow-x-scroll sm:overflow-hidden">
            {chatMessagesList.length > 0 ? (
              chatMessagesList.map((chatData: any) => (
                <div
                key={chatData._id}
                onClick={()=>contactClicked(chatData)}
                
                className="flex  gap-2 sm:gap-5 sm:px-5  border-b-2  border-gray-100 h-16 sm:w-full items-center hover:bg-gray-200 active:bg-gray-400 cursor-pointer transition-all duration-300">
                  <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                    <AvatarImage
                      src={chatData.name && chatData?.picture}
                      alt="Avatar"
                      className="object-cover w-full h-full bg-gray-300"
                    />

                    <div
                      className={`bg-gray-200 border-2 border-white/70 uppercase h-10 w-10 text-lg  flex items-center justify-center  rounded-full`}
                    >
                      {chatData?.name && `${chatData.name.charAt(0)}`}
                    </div>
                  </Avatar>

                  <div className="hidden sm:block">Dr. {chatData?.name && `${chatData.name}`}</div>
                </div>
              ))
            ) : (
              <div>No chats</div>
            )}
          </div>
        </div>

        <div className="flex-grow relative h-[75vh] sm:h-[85vh]">
          {selectedChatData?._id ? (
            <>
              <MessageHeader />
              <MessageContainer />
              <SendMessageBar />
            </>
          ) : (
            <div className=" h-full flex justify-center items-center">
              no chat selected, click on a message
            </div>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl text-white animate-pulse">Uploading File</h5>
           <p className="text-white animate-pulse">Kindly wait ...</p>
          {fileUploadProgress}%
        </div>
      )}

      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className="text-5xl text-white animate-pulse">Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      )}


    </div>
  );
};

export default MessagesPage;
