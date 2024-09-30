import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../featurea/AuthSlice";
import ChatSlice from "../featurea/ChatSlice";

export default configureStore({
  reducer: {
    user: AuthSlice,
    chat: ChatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
