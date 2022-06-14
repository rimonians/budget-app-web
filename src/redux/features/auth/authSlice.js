import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";

const initialState = {
  loading: true,
  token: null,
  isAuthenticated: false,
  error: null,
};

export const authInitiate = createAsyncThunk("auth/authInitiate", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await client.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.result) {
      return token;
    } else {
      return Promise.reject("Your token is not valid");
    }
  } else {
    return Promise.reject("No auth token found");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authInitiate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authInitiate.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(authInitiate.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { resetAuth } = authSlice.actions;
