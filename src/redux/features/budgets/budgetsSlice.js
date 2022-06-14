import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";

const initialState = {
  loading: true,
  budgets: [],
  copyBudgets: [],
  activeFilterType: "all",
  error: null,
};

export const fetchBudgets = createAsyncThunk(
  "budgets/fetchBudgets",
  async (token) => {
    const res = await client.get("/budget/budgets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.results) {
      return res.data.results;
    } else {
      return Promise.reject("Budgets not found");
    }
  }
);

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    filterBudgets: (state, actions) => {
      const payload = actions.payload;
      if (payload === "all") {
        state.copyBudgets = state.budgets;
        state.activeFilterType = "all";
      } else {
        const filtered = state.budgets.filter(
          (budget) => budget.type === payload
        );
        state.copyBudgets = filtered;
        state.activeFilterType = actions.payload;
      }
    },
    resetBudgets: (state) => {
      state.loading = false;
      state.budgets = [];
      state.copyBudgets = [];
      state.activeFilterType = "all";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBudgets.pending, (state) => {
      state.loading = true;
      state.budgets = [];
      state.copyBudgets = [];
      state.error = null;
    });
    builder.addCase(fetchBudgets.fulfilled, (state, action) => {
      state.loading = false;
      state.budgets = action.payload;
      state.copyBudgets = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBudgets.rejected, (state, action) => {
      state.loading = false;
      state.budgets = [];
      state.copyBudgets = [];
      state.error = action.error.message;
    });
  },
});

export default budgetsSlice.reducer;
export const { filterBudgets, resetBudgets } = budgetsSlice.actions;
