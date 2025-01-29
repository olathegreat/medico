import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFolderZip } from "react-icons/md";
import moment from "moment";
import { IoMdArrowRoundDown, IoMdClose } from "react-icons/io";
import { addExistingMessages, setFileDownloadProgress, setIsDownloading } from "../../utils/appSlice";
import axiosInstance from "../../utils/axios";

interface Message {
  _id: string;
  sender: string;
  messageType: "text" | "file";
  content?: string;
  fileUrl?: string;
  timeStamp: string;
}

interface AppState {
  app: {
    selectedChatData: {
      _id: string;
    };
    selectedChatMessages: Message[];
  };
}

const MessageContainer = () => {
  const { selectedChatData, selectedChatMessages  } = useSelector(
    (state: AppState) => state.app
  );
  
  

  const HOST = import.meta.env.VITE_ORIGIN as string;

  const [showImage, setShowImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const checkIfImage = (filePath: string | undefined): boolean => {
    if (!filePath) return false;
    const imageRegex =
      /\.(png|jpg|jpeg|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };
  const token = sessionStorage.getItem("token");
  const bearerToken = token ? "Bearer " + token : "";

  const downloadFile = async (file: string) => {
    try {
      dispatch(setIsDownloading());
      dispatch(setFileDownloadProgress(0));

      const response = await axiosInstance.get(`${HOST}/${file}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;

          if (loaded && total) {
            const percentCompleted = Math.round((loaded * 100) / total);
            dispatch(setFileDownloadProgress(percentCompleted));
          }
        },
      });

      const urlBlob = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", file.split("/").pop() || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);

      dispatch(setIsDownloading());
      dispatch(setFileDownloadProgress(0));
    } catch (error) {
      console.error("File download failed:", error);
      dispatch(setIsDownloading());
      dispatch(setFileDownloadProgress(0));
    }
  };
  useEffect(()=>{
    const getMessages = async () =>{

      try{

        const response = await axiosInstance.get(`/messages/get-user-messages/${selectedChatData._id}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: bearerToken,
          }})

          console.log(response);
          dispatch(addExistingMessages(response.data.messages))

      }catch(err){
        console.log(err)

      }

    }

    getMessages()

  },[selectedChatData])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(selectedChatMessages);
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate: string | null = null;

    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          <div
            className={`${
              message.sender === selectedChatData._id ? "text-left" : "text-right"
            }`}
          >
            {message.messageType === "text" && (
              <div
                className={`${
                  message.sender === selectedChatData._id
                    ? "bg-white border-gray-500 text-gray-500"
                    : "bg-green-600 text-white border-green-500"
                } border inline-block p-2 sm:px-4 rounded my-1 max-w-[50%] break-words`}
              >
                {message.content}
              </div>
            )}

            {message.messageType === "file" && (
              <div>
                <div
                  className={`${
                    message.sender === selectedChatData._id
                      ? "bg-white border-gray-500 text-gray-500"
                      : "bg-green-600 text-white border-green-500"
                  } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
                >
                  {checkIfImage(message.fileUrl) ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setShowImage(true);
                        setImageUrl(message.fileUrl || "");
                      }}
                    >
                      <img
                        src={`${HOST}/${message.fileUrl}`}
                        height={300}
                        width={300}
                        alt="img"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-green-600/50 text-3xl bg-gray-600/20 rounded-full p-3">
                        <MdFolderZip />
                      </span>
                      <span>{message.fileUrl?.split("/").pop()}</span>
                      <span
                        className="bg-gray-400 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                        onClick={() => downloadFile(message.fileUrl || "")}
                      >
                        <IoMdArrowRoundDown />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-600">
              {moment(message?.timeStamp).format("LT")}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex-1 h-[70vh]  overflow-y-auto scrollbar-hidden p-4  px-0 w-full">

      
      {renderMessages()}
      <div ref={scrollRef}></div>
      {showImage && imageUrl && (
        <div className="fixed z-[1000] top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img
              src={`${HOST}/${imageUrl}`}
              className="h-[80vh] w-full bg-cover"
              alt="preview"
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => downloadFile(imageUrl)}
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowImage(false);
                setImageUrl(null);
              }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
