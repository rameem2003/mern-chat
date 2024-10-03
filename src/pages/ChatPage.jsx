import React, { useEffect } from "react";
import ChatBody from "../components/ChatBody";
import GroupList from "../components/GroupList";
import SearchSection from "../components/common/SearchSection";
import FriendsList from "../components/FriendsList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { AuthReducer } from "../redux/featurea/AuthSlice";

const ChatPage = () => {
  // user data
  const data = useSelector((state) => state.user.user);
  const chatData = useSelector((state) => state.chat.chat);
  // dispatch instance
  const dispatch = useDispatch();
  // navigation
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(AuthReducer(user));
    } else {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, [data]);
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
