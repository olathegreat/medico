import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketContext";
import { addMessages} from "../../utils/appSlice";


const SendMessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userInfo = useSelector((state:any)=> state.app.user)
  // const doctorInfo = useSelector((state:any)=> state.app.doctor)
  const selectedChatData = useSelector((state:any)=> state.app.selectedChatData)

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const socket = useSocket();
  console.log(socket);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAddEmoji = (emoji: any) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleAttachmentChange = async (e: any) => {
     console.log(e)
  };

  useEffect (() => {
    function handleClickOutside(event:any) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const dispatch = useDispatch();


  const handleSendMessage = async()=>{
    
      if (!message.trim()) {
        console.log("Cannot send an empty message");
        return;
      }
       console.log(socket);

       if(!socket){
        console.error("Socket is not connected!");
    return;
       }
      
       if(socket ===null){
        console.log("socket is not equal to null")
       }
        socket.emit("send-message", {
          sender: userInfo._id,
          content: message.trim(),
          recipient: selectedChatData._id,
          messageType: "text",
          fileUrl: undefined,
          recipientModel: userInfo !== null ? 'Doctor' : 'User' ,
          senderModel: userInfo !== null ? 'User' : 'Doctor',
          
        });
        console.log( {
          sender: userInfo._id,
          content: message.trim(),
          recipient: selectedChatData._id,
          messageType: "text",
          fileUrl: undefined,
          recipientModel: userInfo !== null ? 'Doctor' : 'User' ,
          senderModel: userInfo !== null ? 'User' : 'Doctor',
          
        })
        dispatch(addMessages({
          sender: userInfo._id,
          content: message.trim(),
          recipient: selectedChatData._id,
          messageType: "text",
          fileUrl: undefined,
          recipientModel: userInfo !== null ? 'Doctor' : 'User' ,
          senderModel: userInfo !== null ? 'User' : 'Doctor',
          

        }))
        

       
  
   
  
      setMessage("");
    
  }

  return (
    <div className="absolute bottom-0 w-full flex gap-3 sm:gap-7  h-10 sm:h-16 sm:pl-5">
      <div className="flex-grow flex bg-gray-300 h-full">
        <Input
          placeholder="Type a message"
          value={message}
          className="border-gray-400 flex-grow h-full"
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button  onClick={handleAttachmentClick} className="bg-gray-300 h-auto">
          <GrAttachment className="text-4xl text-gray-700" />
        </Button>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />

        <div className="relative">
          <Button
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-gray-300 h-full"
          >
            <RiEmojiStickerLine className="text-3xl" />
          </Button>

          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              className="shadow-gray-500 shadow-md"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
       
      </div>
      <div>
        <Button
        onClick={handleSendMessage}
        className="bg-green-500 text-white h-full p-3 rounded-md duration-300 transition-all hover:bg-green-400"
        
        >
            <IoSend className="text-xl sm:text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default SendMessageBar;
