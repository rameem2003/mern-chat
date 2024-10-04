import React, { useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { CgSmileMouthOpen } from "react-icons/cg";
import { BsCamera } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from "react-redux";
import { push, ref, set } from "firebase/database";
import { db } from "../config/firebase.config";
import {
  getStorage,
  ref as FbstorageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { MdAudiotrack } from "react-icons/md";
import { IoDocumentAttach } from "react-icons/io5";
import { ProgressBar } from "react-loader-spinner";

const Input = () => {
  const me = useSelector((state) => state.user.user);
  const chatData = useSelector((state) => state.chat.chat);
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [audioModal, setAudioModal] = useState(false);
  const [audioFile, setAudioFile] = useState("");
  const [docModal, setDocModal] = useState(false);
  const [docFile, setDocFile] = useState("");
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const storageRef = FbstorageRef(storage, `chatimages/${Date.now()}`);

  const handleSend = (e) => {
    e.preventDefault();
    set(push(ref(db, "chat/")), {
      senderid: me.uid,
      senderName: me.displayName,
      senderPhoto: me.photoURL,
      receiverid: chatData.uid,
      receiverName: chatData.name,
      receiverPhoto: chatData.photoURL,
      date: Date.now(),
      text,
    }).then(() => {
      setText("");
      setPicker(false);
    });
  };

  const handleEmoji = (e) => {
    setText((prevText) => prevText + e.emoji);
  };

  const handleSubmit = () => {
    setLoading(true);
    uploadBytes(storageRef, imgFile).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        set(push(ref(db, "chat/")), {
          senderid: me.uid,
          senderName: me.displayName,
          senderPhoto: me.photoURL,
          receiverid: chatData.uid,
          receiverName: chatData.name,
          receiverPhoto: chatData.photoURL,
          date: Date.now(),
          image: downloadURL,
        }).then(() => {
          setImgFile("");
          setImageModal(false);
          setLoading(false);
        });
      });
    });
  };
  const handleAudioSubmit = () => {
    setLoading(true);
    uploadBytes(storageRef, audioFile).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        set(push(ref(db, "chat/")), {
          senderid: me.uid,
          senderName: me.displayName,
          senderPhoto: me.photoURL,
          receiverid: chatData.uid,
          receiverName: chatData.name,
          receiverPhoto: chatData.photoURL,
          date: Date.now(),
          audio: downloadURL,
        }).then(() => {
          setAudioFile("");
          setAudioModal(false);
          setLoading(false);
        });
      });
    });
  };
  const handleDocSubmit = () => {
    setLoading(true);
    uploadBytes(storageRef, docFile).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        set(push(ref(db, "chat/")), {
          senderid: me.uid,
          senderName: me.displayName,
          senderPhoto: me.photoURL,
          receiverid: chatData.uid,
          receiverName: chatData.name,
          receiverPhoto: chatData.photoURL,
          date: Date.now(),
          doc: downloadURL,
        }).then(() => {
          setDocFile("");
          setDocModal(false);
          setLoading(false);
        });
      });
    });
  };

  return (
    <>
      {/* image upload modal */}
      <div
        className={` duration-500 ease-in-out fixed ${
          imageModal ? "opacity-100 z-50" : "opacity-0 z-[-1]"
        } top-0 left-0 bg-white/60 backdrop-blur-md h-screen w-full`}
      >
        <div
          className={` duration-500 ease-in-out opacity-0 fixed top-[50%] left-[50%] translate-x-[-50%] ${
            imageModal
              ? "translate-y-[-50%] opacity-100"
              : "translate-y-[-350%] "
          }  z-50 w-[500px] h-auto shadow-2xl rounded-lg p-3 bg-white`}
        >
          <FaTimes
            onClick={() => {
              setImageModal(false);
              setImgFile(null);
            }}
            className="text-xl ml-auto mb-2 cursor-pointer"
          />

          <label
            htmlFor="uploadFile2"
            className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 mb-2 fill-gray-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload file click here
            <input
              onChange={(e) => setImgFile(e.target.files[0])}
              type="file"
              id="uploadFile2"
              className="hidden"
              accept="image/*"
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </label>
          {loading && (
            <div className=" flex items-center justify-center">
              <ProgressBar
                visible={true}
                height="80"
                width="80"
                barColor="#5F35F5"
                borderColor="#11175D"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <div className=" my-5 text-center">
            {imgFile && (
              <button
                onClick={handleSubmit}
                className=" mx-auto flex items-center justify-center gap-1 py-1 px-3 bg-secondary font-bold text-xl text-white rounded-full "
              >
                <IoMdCloudUpload />
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
      {/* image upload modal */}

      {/* audio upload modal */}
      <div
        className={` duration-500 ease-in-out fixed ${
          audioModal ? "opacity-100 z-50" : "opacity-0 z-[-1]"
        } top-0 left-0 bg-white/60 backdrop-blur-md h-screen w-full`}
      >
        <div
          className={` duration-500 ease-in-out opacity-0 fixed top-[50%] left-[50%] translate-x-[-50%] ${
            audioModal
              ? "translate-y-[-50%] opacity-100"
              : "translate-y-[-350%] "
          }  z-50 w-[500px] h-auto shadow-2xl rounded-lg p-3 bg-white`}
        >
          <FaTimes
            onClick={() => {
              setAudioModal(false);
              setAudioFile(null);
            }}
            className="text-xl ml-auto mb-2 cursor-pointer"
          />

          <label
            htmlFor="uploadFile3"
            className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 mb-2 fill-gray-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload Audio click here
            <input
              onChange={(e) => setAudioFile(e.target.files[0])}
              type="file"
              id="uploadFile3"
              className="hidden"
              accept=".mp3,audio/*"
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              Audio Files Allowed.
            </p>
          </label>
          {loading && (
            <div className=" flex items-center justify-center">
              <ProgressBar
                visible={true}
                height="80"
                width="80"
                barColor="#5F35F5"
                borderColor="#11175D"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <div className=" my-5 text-center">
            {audioFile && (
              <button
                onClick={handleAudioSubmit}
                className=" mx-auto flex items-center justify-center gap-1 py-1 px-3 bg-secondary font-bold text-xl text-white rounded-full "
              >
                <IoMdCloudUpload />
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
      {/* audio upload modal */}

      {/* doc upload modal */}
      <div
        className={` duration-500 ease-in-out fixed ${
          docModal ? "opacity-100 z-50" : "opacity-0 z-[-1]"
        } top-0 left-0 bg-white/60 backdrop-blur-md h-screen w-full`}
      >
        <div
          className={` duration-500 ease-in-out opacity-0 fixed top-[50%] left-[50%] translate-x-[-50%] ${
            docModal ? "translate-y-[-50%] opacity-100" : "translate-y-[-350%] "
          }  z-50 w-[500px] h-auto shadow-2xl rounded-lg p-3 bg-white`}
        >
          <FaTimes
            onClick={() => {
              setDocModal(false);
              setDocFile(null);
            }}
            className="text-xl ml-auto mb-2 cursor-pointer"
          />

          <label
            htmlFor="uploadFile4"
            className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 mb-2 fill-gray-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload DOCS/PDF click here
            <input
              onChange={(e) => setDocFile(e.target.files[0])}
              type="file"
              id="uploadFile4"
              className="hidden"
              accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .ppt, .pptx, .odt, .rtf"
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              DOC, PDF Files Allowed.
            </p>
          </label>
          {loading && (
            <div className=" flex items-center justify-center">
              <ProgressBar
                visible={true}
                height="80"
                width="80"
                barColor="#5F35F5"
                borderColor="#11175D"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <div className=" my-5 text-center">
            {docFile && (
              <button
                onClick={handleDocSubmit}
                className=" mx-auto flex items-center justify-center gap-1 py-1 px-3 bg-secondary font-bold text-xl text-white rounded-full "
              >
                <IoMdCloudUpload />
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
      {/* doc upload modal */}

      <div className=" flex items-center justify-between pt-[35px]">
        <div className="w-full">
          <form
            onSubmit={handleSend}
            action=""
            className=" w-full flex items-center justify-between"
          >
            <div className="w-[93%] relative flex items-center justify-between">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="w-full h-[45px] rounded-[10px] bg-customGrey pl-5 pr-20"
                type="text"
                placeholder="Write your massage......"
                name=""
                id=""
              />
              <div className=" absolute top-[50%] translate-y-[-50%] right-2 flex items-center justify-end gap-2">
                <CgSmileMouthOpen
                  onClick={() => setPicker(!picker)}
                  size={22}
                  className=" text-emojiGrey cursor-pointer"
                />
                <BsCamera
                  onClick={() => setImageModal(true)}
                  size={22}
                  className=" text-emojiGrey cursor-pointer"
                />

                <MdAudiotrack
                  onClick={() => setAudioModal(true)}
                  className=" text-emojiGrey cursor-pointer"
                />
                <IoDocumentAttach
                  onClick={() => setDocModal(true)}
                  className=" text-emojiGrey cursor-pointer"
                />
              </div>
              {picker && (
                <div className=" absolute top-[-500px] right-0">
                  <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
              )}
            </div>

            {text ? (
              <button
                // onClick={handleSend}
                className=" flex items-center justify-center w-[45px] h-[45px] rounded-[10px] bg-secondary text-white"
              >
                <FaPaperPlane />
              </button>
            ) : (
              <button className=" pointer-events-none opacity-55 flex items-center justify-center w-[45px] h-[45px] rounded-[10px] bg-secondary text-white">
                <FaPaperPlane />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Input;
