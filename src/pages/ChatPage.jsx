import React from "react";
import ChatBody from "../components/ChatBody";
import GroupList from "../components/GroupList";
import SearchSection from "../components/common/SearchSection";
import FriendsList from "../components/FriendsList";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const chatData = useSelector((state) => state.chat.chat);
  return (
    <section className="flex gap-[23px] h-full">
      <div className="w-4/12">
        <SearchSection />
        <div className="mt-10">
          <GroupList />
          <FriendsList />
        </div>
      </div>

      <div className="w-8/12">
        {chatData ? (
          <ChatBody />
        ) : (
          <div className=" flex items-center justify-center px-[51px] pt-[24px] pb-[34px] shadow-custom rounded-[20px] h-[810px]">
            <img src="/rol-studio.png" alt="" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatPage;
