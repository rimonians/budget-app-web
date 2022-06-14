import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterBudgets } from "../redux/features/budgets/budgetsSlice";
import { fetchBudgets } from "../redux/features/budgets/budgetsSlice";
import useAuth from "./useAuth";
import client from "../api/client";
import { toast } from "react-toastify";

const useBudgets = () => {
  const { loading, budgets, copyBudgets, activeFilterType, error } =
    useSelector((state) => state.budgets);
  const dispatch = useDispatch();
  const { token } = useAuth();

  const handleFilterBudgets = (type) => {
    dispatch(filterBudgets(type));
  };

  const createBudget = async (values, actions) => {
    try {
      const res = await client.post("/budget/create", values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      actions.resetForm();
      toast.success(res.data.message);
      dispatch(fetchBudgets(token));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        const errorsForDisplay = {};
        Object.entries(errors).map(
          (el) => (errorsForDisplay[el[0]] = el[1].msg)
        );
        actions.setErrors(errorsForDisplay);
      } else {
        toast.error(err.message);
      }
    }
  };

  const updateBudget = async (values, actions, id, setTrackedBudget) => {
    try {
      const res = await client.put(`/budget/${id}`, values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      setTrackedBudget(null);
      dispatch(fetchBudgets(token));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        const errorsForDisplay = {};
        Object.entries(errors).map(
          (el) => (errorsForDisplay[el[0]] = el[1].msg)
        );
        actions.setErrors(errorsForDisplay);
      } else {
        toast.error(err.message);
      }
    }
  };

  const deleteBudget = async (id, setTrackedBudget) => {
    try {
      const res = await client.delete(`/budget/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      setTrackedBudget(null);
      dispatch(fetchBudgets(token));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    loading,
    budgets,
    copyBudgets,
    activeFilterType,
    error,
    handleFilterBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
  };
};

export default useBudgets;
