import React from "react";
import { useSelector, useDispatch } from "react-redux";
import client from "../api/client";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { fetchUser } from "../redux/features/user/userSlice";

const useUser = () => {
  const { loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { token } = useAuth();

  const updateProfileImage = async (values, actions) => {
    const formData = new FormData();
    formData.append("profileImage", values.profileImage);

    try {
      const res = await client.put("/user/update-profile-image", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      actions.resetForm();
      toast.success(res.data.message);
      dispatch(fetchUser(token));
    } catch (err) {
      const error = err.response.data.message;
      console.log(error);
      actions.setErrors({ profileImage: error });
    }
  };

  const updateProfileInfo = async (values, actions) => {
    try {
      const res = await client.put("/user/update-profile-info", values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      actions.resetForm();
      toast.success(res.data.message);
      dispatch(fetchUser(token));
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

  return { loading, user, error, updateProfileImage, updateProfileInfo };
};

export default useUser;
