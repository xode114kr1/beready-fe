import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import menuReducer from "./menu/menuSlice";
import reviewReducer from "./review/reviewSlice";
import estimationReducer from "./estimation/estimationSlice";
import lilacReducer from "./lilac/lilacSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    review: reviewReducer,
    estimation: estimationReducer,
    lilac: lilacReducer,
  },
});
