import React from "react";

import ChatPageGroupSection from "../components/ChatPageGroupSection";
import ChatPageFriendSection from "../components/ChatPageFriendSection";
import ChatBody from "../components/ChatBody";

const ChatPage = () => {
  return (
    <section className="flex gap-[23px]">
      <div className="w-4/12 ">
        <ChatPageGroupSection />
        <ChatPageFriendSection />
      </div>

      <div className="w-8/12">
        <ChatBody />
      </div>
    </section>
  );
};

export default ChatPage;
