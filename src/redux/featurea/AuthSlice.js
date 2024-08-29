import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "counter",
  initialState: {
    user: localStorage.getItem("mernChatUser")
      ? JSON.parse(localStorage.getItem("mernChatUser"))
      : null,
  },
  reducers: {
    AuthReducer: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("mernChatUser", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { AuthReducer } = AuthSlice.actions;

export default AuthSlice.reducer;
