import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
  name: "Chat",
  initialState: {
    chat: localStorage.getItem("mernChat_chatinfo")
      ? JSON.parse(localStorage.getItem("mernChat_chatinfo"))
      : null,
  },
  reducers: {
    ChatReducer: (state, action) => {
      state.chat = action.payload;
      localStorage.setItem("mernChat_chatinfo", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { ChatReducer } = ChatSlice.actions;

export default ChatSlice.reducer;
