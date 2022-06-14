import React from "react";
import { useSelector, useDispatch } from "react-redux";
import client from "../api/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authInitiate, resetAuth } from "../redux/features/auth/authSlice";
import { resetUser } from "../redux/features/user/userSlice";
import { resetBudgets } from "../redux/features/budgets/budgetsSlice";

const useAuth = () => {
  const { loading, token, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async (values, actions) => {
    try {
      const res = await client.post("/auth/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      actions.resetForm();
      toast.success(res.data.message);
      navigate("/signin");
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

  const signIn = async (values, actions) => {
    try {
      const res = await client.post("/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      actions.resetForm();
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      dispatch(authInitiate());
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

  const signOut = () => {
    localStorage.removeItem("token");
    dispatch(resetAuth());
    dispatch(resetUser());
    dispatch(resetBudgets());
    toast.success("Signout successfull");
  };

  return { loading, token, isAuthenticated, error, signUp, signIn, signOut };
};

export default useAuth;
