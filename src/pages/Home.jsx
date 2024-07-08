import React from "react";
import GroupRequestList from "../components/GroupRequestList";
import FriendsList from "../components/FriendsList";
import UserList from "../components/UserList";
import FriendRequestList from "../components/FriendRequestList";
import GroupList from "../components/GroupList";
import BlockList from "../components/BlockList";

const Home = () => {
  return (
    <section>
      <div className="flex">
        <div className="w-4/12">
          <GroupRequestList />
        </div>
        <div className="w-4/12">
          <FriendsList />
        </div>
        <div className="w-4/12">
          <UserList />
        </div>
      </div>

      <div className="flex mt-[43px]">
        <div className="w-4/12">
          <FriendRequestList />
        </div>
        <div className="w-4/12">
          <GroupList />
        </div>
        <div className="w-4/12">
          <BlockList />
        </div>
      </div>
    </section>
  );
};

export default Home;
