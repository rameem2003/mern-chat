import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../featurea/AuthSlice";

export default configureStore({
  reducer: {
    user: AuthSlice,
  },
});
