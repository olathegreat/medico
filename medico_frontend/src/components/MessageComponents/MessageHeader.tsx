import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";

const MessageHeader = () => {
  const chatData = useSelector((state: any)=> state.app.selectedChatData)
  
  return (
    <div className="flex justify-between w-full items-center border-b-2 p-3 border-gray-300">
      <div className="flex gap-5 items-center ">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden">
          <AvatarImage
            src={chatData?.picture}
            alt="Avatar"
            className="object-cover w-full h-full bg-gray-300"
          />

          <div
            className={`bg-gray-200 border-2 border-white/70 uppercase h-10 w-10 text-lg  flex items-center justify-center rounded-full`}
          >
            {chatData.name.charAt(0)}
          </div>
        </Avatar>

        <div className="text-xl">Dr. {chatData.name}</div>
      </div>

      <div className=" cursor-pointer text-2xl">X</div>
    </div>
  );
};

export default MessageHeader;
