import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import budgetsReducer from "./features/budgets/budgetsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    budgets: budgetsReducer,
  },
});

export default store;
