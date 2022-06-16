import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";
import { toast } from "react-toastify";
import { signout } from "../Auth/authSlice";

const initialState = {
  loading: true,
  budgets: [],
  budgetsSafe: [], // budgets for extra safety
  tracked: null, // track budget for update or delete
  filterBy: "all", // filter by all, income, expense
  error: null,
};

export const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async (token, thunkAPI) => {
    try {
      const res = await client.get("/budget/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createBudget = createAsyncThunk(
  "budget/createBudget",
  async ({ values, actions, token }, thunkAPI) => {
    try {
      const res = await client.post("/budget/create", values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateBudget = createAsyncThunk(
  "budget/updateBudget",
  async ({ values, actions, _id, token }, thunkAPI) => {
    try {
      const res = await client.put(`/budget/${_id}`, values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBudget = createAsyncThunk(
  "budget/deleteBudget",
  async ({ _id, token }, thunkAPI) => {
    try {
      const res = await client.delete(`/budget/${_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    filterBudgets: (state, actions) => {
      const payload = actions.payload;
      if (payload === "all") {
        state.budgets = state.budgetsSafe;
        state.filterBy = "all";
      } else {
        const filtered = state.budgetsSafe.filter(
          (budget) => budget.type === payload
        );
        state.budgets = filtered;
        state.filterBy = actions.payload;
      }
    },
    trackBudget: (state, action) => {
      state.tracked = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Builder for fetch budgets
    builder.addCase(fetchBudgets.pending, (state) => {
      state.loading = true;
      state.budgets = [];
      state.budgetsSafe = [];
      state.error = null;
    });
    builder.addCase(fetchBudgets.fulfilled, (state, action) => {
      const payload = action.payload;
      state.loading = false;
      state.budgets = payload.results;
      state.budgetsSafe = payload.results;
      state.error = null;
    });
    builder.addCase(fetchBudgets.rejected, (state, action) => {
      const payload = action.payload;
      state.loading = false;
      state.budgets = [];
      state.budgetsSafe = [];
      state.error = payload.message;
    });
    // Builder for create budget
    builder.addCase(createBudget.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;

      state.budgetsSafe.push(payload.result);
      if (payload.result.type === state.filterBy) {
        state.budgets.push(payload.result);
      }
      if (state.filterBy === "all") {
        state.budgets = state.budgetsSafe;
      }

      toast.success(payload.message);
      actions.resetForm();
      actions.setSubmitting(false);
    });
    builder.addCase(createBudget.rejected, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;

      if (payload.errors) {
        const errorsForDisplay = {};
        Object.entries(payload.errors).map(
          (el) => (errorsForDisplay[el[0]] = el[1].msg)
        );
        actions.setErrors(errorsForDisplay);
      } else {
        toast.error(payload.message);
      }
    });
    // Builder for update budget
    builder.addCase(updateBudget.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      state.budgetsSafe = state.budgetsSafe.map((budget) => {
        if (budget._id === payload.result._id) {
          return payload.result;
        }
        return budget;
      });
      state.budgets = state.budgets.map((budget) => {
        if (budget._id === payload.result._id) {
          return payload.result;
        }
        return budget;
      });
      toast.success(payload.message);
      actions.setSubmitting(false);
    });
    builder.addCase(updateBudget.rejected, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;

      if (payload.errors) {
        const errorsForDisplay = {};
        Object.entries(payload.errors).map(
          (el) => (errorsForDisplay[el[0]] = el[1].msg)
        );
        actions.setErrors(errorsForDisplay);
      } else {
        toast.error(payload.message);
      }
    });
    // Builder for delete budget
    builder.addCase(deleteBudget.fulfilled, (state, action) => {
      const payload = action.payload;
      state.budgetsSafe = state.budgetsSafe.filter(
        (budget) => budget._id !== payload.result._id
      );
      state.budgets = state.budgets.filter(
        (budget) => budget._id !== payload.result._id
      );
      toast.success(payload.message);
    });
    builder.addCase(deleteBudget.rejected, (state, action) => {
      const payload = action.payload;
      toast.error(payload.message);
    });
    // Builder for signout
    builder.addCase(signout, (state) => {
      state.loading = true;
      state.budgets = [];
      state.budgetsSafe = [];
      state.tracked = null;
      state.filterBy = "all";
      state.error = null;
    });
  },
});

export default budgetSlice.reducer;
export const { filterBudgets, trackBudget } = budgetSlice.actions;
