import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import menuReducer from "./menu/menuSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
});
