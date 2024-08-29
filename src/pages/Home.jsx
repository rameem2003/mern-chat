import React, { useEffect, useState } from "react";
import GroupRequestList from "../components/GroupRequestList";
import FriendsList from "../components/FriendsList";
import UserList from "../components/UserList";
import FriendRequestList from "../components/FriendRequestList";
import GroupList from "../components/GroupList";
import BlockList from "../components/BlockList";
import Flex from "../components/common/Flex";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { AuthReducer } from "../redux/featurea/AuthSlice";

const Home = () => {
  // dispatch instance
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);
  // user data
  const data = useSelector((state) => state.user.user);
  // navigation
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(AuthReducer(user));
    } else {
      setVerify(false);
      navigate("/login");
    }
  });

  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else if (data.emailVerified) {
      setVerify(false);
    } else {
      setVerify(true);
    }
  }, [data]);
  return (
    <>
      {verify && (
        <div className=" fixed top-0 left-0 w-full h-screen bg-secondary/90 backdrop-blur-sm flex items-center justify-center">
          <p className=" font-nunito font-bold text-4xl text-white">
            To prevent the potential spam. Please verify your email
          </p>
        </div>
      )}

      <section>
        <Flex>
          <div className="w-4/12">
            <GroupRequestList />
          </div>
          <div className="w-4/12">
            <FriendsList />
          </div>
          <div className="w-4/12">
            <UserList />
          </div>
        </Flex>

        <Flex className=" mt-[43px]">
          <div className="w-4/12">
            <FriendRequestList />
          </div>
          <div className="w-4/12">
            <GroupList />
          </div>
          <div className="w-4/12">
            <BlockList />
          </div>
        </Flex>
      </section>
    </>
  );
};

export default Home;
