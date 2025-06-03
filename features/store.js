import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import menuReducer from "./menu/menuSlice";
import reviewReducer from "./review/reviewSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    review: reviewReducer,
  },
});
