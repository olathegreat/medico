import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketContext";
import {
  addMessages,
  setFileUploadProgress,
  setIsUploading,
} from "../../utils/appSlice";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";
import { AiOutlinePicture } from "react-icons/ai";
import DarkModeSetterFunction from "../../utils/DarkModeSetterFunction";

const SendMessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userInfo = useSelector((state: any) => state.app.user);
  // const doctorInfo = useSelector((state:any)=> state.app.doctor)
  const selectedChatData = useSelector(
    (state: any) => state.app.selectedChatData
  );

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const socket = useSocket();

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAddEmoji = (emoji: any) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleAttachmentChange = async (e: any) => {
    try {
      const file = e.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(setIsUploading());

        const res = await axiosInstance.post("/messages/upload", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          onUploadProgress: (data) => {
            const percent =
              data.loaded && data.total
                ? Math.round((100 * data.loaded) / data!.total)
                : 0;
            dispatch(setFileUploadProgress(percent));
          },
        });

        if (res.status === 200 && res.data) {
          const message = {
            sender: userInfo._id,
            content: undefined,
            recipient: selectedChatData._id,
            messageType: "file",
            fileUrl: res.data.filePath,
            recipientModel: userInfo !== null ? "Doctor" : "User",
            senderModel: userInfo !== null ? "User" : "Doctor",
          };

          socket.emit("send-message", message);
          dispatch(addMessages(message));
          dispatch(setIsUploading());
        }
      }
    } catch (err: any) {
      console.log(err);
      dispatch(setIsUploading());
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
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

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) {
        console.log("Cannot send an empty message");
        return;
      }

      if (!socket) {
        console.error("Socket is not connected!");
        return;
      }
      const messageData = {
        sender: userInfo._id,
        content: message.trim(),
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
        recipientModel: userInfo !== null ? "Doctor" : "User",
        senderModel: userInfo !== null ? "User" : "Doctor",
      };

      socket.emit("send-message", messageData);

      dispatch(addMessages(messageData));
      toast("message sent to doctor");

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const darkMode = DarkModeSetterFunction();

  return (
    <div
      className={`${
        darkMode && "text-gray-700"
      } absolute bottom-0 w-full flex gap-3 sm:gap-7  h-10 sm:h-16 sm:pl-5`}
    >
      <div className="flex-grow flex bg-gray-300 h-full">
        <Input
          placeholder="Type a message"
          value={message}
          className={`border-gray-400 flex-grow h-full ${
            darkMode && "text-gray-700"
          }`}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button onClick={handleAttachmentClick} className="bg-gray-300 h-auto">
          {/* <GrAttachment className="text-4xl text-gray-700" /> */}
          <AiOutlinePicture className="text-4xl text-gray-700" />
        </Button>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
          accept="image/*"
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
              theme={darkMode ? Theme.DARK : Theme.LIGHT}
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={handleSendMessage}
          className="bg-green-700 text-white h-full p-3 rounded-md duration-300 transition-all hover:bg-green-400"
        >
          <IoSend className="text-xl sm:text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default SendMessageBar;
