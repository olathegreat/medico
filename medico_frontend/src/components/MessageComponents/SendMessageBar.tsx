import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const SendMessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAddEmoji = (emoji: any) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleAttachmentChange = async (e: any) => {

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

  return (
    <div className="absolute bottom-0 w-full flex gap-7  h-16 pl-5">
      <div className="flex-grow flex bg-gray-300 h-full">
        <Input
          placeholder="Type a message"
          value={message}
          className="border-gray-400 flex-grow h-full"
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button className="bg-gray-300 h-auto">
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
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
       
      </div>
      <div>
        <Button
        className="bg-green-500 text-white h-full p-3 rounded-md duration-300 transition-all hover:bg-green-400"
        
        >
            <IoSend className="text-xl sm:text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default SendMessageBar;
