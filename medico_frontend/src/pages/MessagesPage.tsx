import Nav from "../components/Nav";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import Doc1 from "../assets/assets_frontend/doc1.png";
import MessageHeader from "../components/MessageComponents/MessageHeader";
import MessageContainer from "../components/MessageComponents/MessageContainer";
import SendMessageBar from "../components/MessageComponents/SendMessageBar";

const MessagesPage = () => {
  const userName = "John Doe";
  return (
    <div>
      <Nav />

      <div className="flex">
        <div className="w-[320px]  shadow h-[90vh] shadow-black">
          <h2 className="text-start p-5  text-2xl">Messages</h2>

          <div className="flex flex-col ">
            <div className="flex gap-5 px-5 border-b-2  border-gray-100 h-12 w-full items-center">
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

              <div >{userName}</div>
            </div>
          </div>
        </div>



        <div className="flex-grow relative">
            <MessageHeader/>
            <MessageContainer/>
            <SendMessageBar/>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
