import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice.js";

export default configureStore({
  reducer: {
    users: userReducer,
  },
});
