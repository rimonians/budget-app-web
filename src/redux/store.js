import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import userReducer from "./features/User/userSlice";
import budgetReducer from "./features/Budget/budgetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    budget: budgetReducer,
  },
});

export default store;
