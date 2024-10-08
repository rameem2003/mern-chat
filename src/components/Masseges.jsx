import { onValue, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../config/firebase.config";
import moment from "moment";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { MdSimCardDownload } from "react-icons/md";

const Masseges = () => {
  const me = useSelector((state) => state.user.user);
  const chatData = useSelector((state) => state.chat.chat);
  const [masseges, setMasseges] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    const starCountRef = ref(db, "chat/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (
          (me.uid == user.val().senderid &&
            chatData.uid == user.val().receiverid) ||
          (me.uid == user.val().receiverid &&
            chatData.uid == user.val().senderid)
        ) {
          arr.push({ ...user.val(), uid: user.key });
        }
      });
      setMasseges(arr);
    });
  }, [chatData && chatData.uid]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [masseges]);

  return (
    <div className="pt-[30px] h-[80%] border-b-[1px] border-gray-300 overflow-y-scroll no-scrollbar">
      {masseges.length == 0 && (
        <p className=" font-semibold text-2xl text-secondary/60">
          Let's express feelings............
        </p>
      )}
      {masseges.map((data, i) =>
        me.uid == data.senderid ? (
          <div
            ref={scrollRef}
            className="flex items-start flex-row-reverse mt-[29px] relative mr-2"
            key={i}
          >
            {data.text && (
              <div>
                <div>
                  <p className=" break-words max-w-[400px] pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-secondary text-white rounded-[10px] font-poppins font-medium text-[16px]">
                    {data.text}
                  </p>
                  <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
                <img
                  className=" absolute bottom-[18px] right-[-5px] z-50"
                  src="./cornerpurple.png"
                  alt="cornerpurple"
                />
              </div>
            )}

            {data.image && (
              <div>
                <div className=" relative group overflow-hidden">
                  <a
                    href={data.image}
                    target="_blank"
                    className=" duration-300 ease-in-out bg-white shadow-xl p-4 rounded-full w-[50px] h-[50px] flex items-center justify-center text-3xl absolute top-2 right-[-120px] group-hover:right-2"
                  >
                    <MdSimCardDownload />
                  </a>

                  <PhotoProvider>
                    <PhotoView src={data.image}>
                      <img
                        src={data.image}
                        alt="chat img"
                        className=" w-[60%] ml-auto rounded-lg cursor-pointer"
                      />
                    </PhotoView>
                  </PhotoProvider>

                  <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            )}

            {data.audio && (
              <div>
                <div className=" relative group overflow-hidden">
                  <audio src={data.audio} controls></audio>

                  <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            )}

            {data.doc && (
              <div>
                <div>
                  <div className="max-w-[400px] overflow-hidden relative cursor-pointer group">
                    <img src="/doc_placeholder.png" alt="" />

                    <a
                      className=" duration-200 ease-in-out group-hover:bottom-2 block absolute w-[50%] text-center bottom-[-100px] left-[50%] translate-x-[-50%] p-3 bg-secondary rounded-xl font-bold text-sm text-white"
                      href={data.doc}
                      target="_blank"
                    >
                      Download File
                    </a>
                  </div>

                  <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex  items-start flex-col mt-[29px] relative ml-2"
            key={i}
          >
            {data.text && (
              <div>
                <div>
                  <p className="break-words max-w-[400px] pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-customGrey rounded-[20px] font-poppins font-medium text-[16px]">
                    {data.text}
                  </p>
                  <p className="font-poppins font-medium text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>

                <img
                  className=" absolute bottom-[19px] left-[-5px] z-50"
                  src="./cornarwhite.png"
                  alt="cornarwhite"
                />
              </div>
            )}

            {data.image && (
              <div>
                <div className=" relative group overflow-hidden">
                  <a
                    href={data.image}
                    target="_blank"
                    className=" duration-300 ease-in-out bg-white shadow-xl p-4 rounded-full w-[50px] h-[50px] flex items-center justify-center text-3xl absolute top-2 left-[-120px] group-hover:left-2"
                  >
                    <MdSimCardDownload />
                  </a>
                  <PhotoProvider>
                    <PhotoView src={data.image}>
                      <img
                        src={data.image}
                        alt="chat img"
                        className=" w-[60%] mr-auto rounded-lg cursor-pointer"
                      />
                    </PhotoView>
                  </PhotoProvider>

                  <p className="font-poppins font-medium text-left text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            )}

            {data.audio && (
              <div>
                <div className=" relative group overflow-hidden">
                  <audio src={data.audio} controls></audio>

                  <p className="font-poppins font-medium text-left text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            )}

            {data.doc && (
              <div>
                <div>
                  <div className="max-w-[400px] overflow-hidden relative cursor-pointer group">
                    <img src="/doc_placeholder.png" alt="" />

                    <a
                      className=" duration-200 ease-in-out group-hover:bottom-2 block absolute w-[50%] text-center bottom-[-100px] left-[50%] translate-x-[-50%] p-3 bg-secondary rounded-xl font-bold text-sm text-white"
                      href={data.doc}
                      target="_blank"
                    >
                      Download File
                    </a>
                  </div>

                  <p className="font-poppins font-medium text-left text-[12px] text-textDeem">
                    {moment(new Date(data.date), "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Masseges;
