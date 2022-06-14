import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";

const initialState = {
  loading: true,
  user: null,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const res = await client.get("/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.data.result) {
    return res.data.result;
  } else {
    return Promise.reject("Profile not found");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { resetUser } = userSlice.actions;
