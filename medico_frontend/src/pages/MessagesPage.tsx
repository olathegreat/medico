import Nav from "../components/Nav";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import MessageHeader from "../components/MessageComponents/MessageHeader";
import MessageContainer from "../components/MessageComponents/MessageContainer";
import SendMessageBar from "../components/MessageComponents/SendMessageBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../utils/axios";
import { setDirectMessagesContact, setSelectedChatData } from "../utils/appSlice";
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

      console.log(response);

    }catch(err){
      console.log(err)
    }
    };

    getUserDMMessagesList();
  }, []);

  const contactClicked = (contact: any) =>{
    dispatch(setSelectedChatData(contact))
  }
  return (
    <div>
      <Nav />

      <div className="flex">
        <div className="w-[320px]  shadow h-[90vh] shadow-black hidden sm:flex flex-col">
          <h2 className="text-start p-5  text-2xl">Messages</h2>

          <div className="flex flex-col ">
            {chatMessagesList.length > 0 ? (
              chatMessagesList.map((chatData: any) => (
                <div
                onClick={()=>contactClicked(chatData)}
                
                className="flex gap-5 px-5  border-b-2  border-gray-100 h-16 w-full items-center hover:bg-gray-200 active:bg-gray-400 cursor-pointer transition-all duration-300">
                  <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                    <AvatarImage
                      src={chatData.name && chatData?.picture}
                      alt="Avatar"
                      className="object-cover w-full h-full bg-gray-300"
                    />

                    <div
                      className={`bg-gray-200 border-2 border-white/70 uppercase h-10 w-10 text-lg  flex items-center justify-center rounded-full`}
                    >
                      {chatData?.name && `${chatData.name.charAt(0)}`}
                    </div>
                  </Avatar>

                  <div>Dr. {chatData?.name && `${chatData.name}`}</div>
                </div>
              ))
            ) : (
              <div>No chats</div>
            )}
          </div>
        </div>

        <div className="flex-grow relative h-[90vh]">
          {selectedChatData ? (
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
    </div>
  );
};

export default MessagesPage;
