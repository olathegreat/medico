import { Avatar, AvatarImage } from "../ui/avatar";
import Doc1 from "../../assets/assets_frontend/doc1.png";

const MessageHeader = () => {
  const userName = "John Doe";
  return (
    <div className="flex justify-between w-full items-center border-b-2 p-3 border-gray-300">
      <div className="flex gap-5 items-center ">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden">
          <AvatarImage
            src={Doc1}
            alt="Avatar"
            className="object-cover w-full h-full bg-gray-300"
          />

          <div
            className={`bg-gray-200 border-2 border-white/70 uppercase h-10 w-10 text-lg  flex items-center justify-center rounded-full`}
          >
            {userName.charAt(0)}
          </div>
        </Avatar>

        <div className="text-xl">{userName}</div>
      </div>

      <div className=" cursor-pointer text-2xl">X</div>
    </div>
  );
};

export default MessageHeader;
