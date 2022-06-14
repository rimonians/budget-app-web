import React from "react";
import Modal from "../Shared/Modal";
import MyForm, {
  FormHeading,
  FormControll,
  FormSelect,
  FormButton,
} from "../Shared/MyForm";
import {
  initialValues,
  validationSchema,
} from "../../validations/ProfileInfoUpdate";
import useUser from "../../hooks/useUser";

const ProfileInfoUpdateModal = () => {
  const { user, updateProfileInfo } = useUser();
  const { bio, dateOfBirth, gender, address, mobile } = user;

  return (
    <Modal modalId="profileInfoUpdateModal">
      <MyForm
        initialValues={initialValues(bio, dateOfBirth, gender, address, mobile)}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => updateProfileInfo(values, actions)}
      >
        {/* Form heading */}
        <FormHeading title="Update information" slogan="It's easy & free" />
        {/* Form controll for bio */}
        <FormControll name="bio" type="text" placeholder="Enter your bio" />
        {/* Form controll for date of birth */}
        <FormControll
          name="dateOfBirth"
          type="date"
          placeholder="Enter your date of birth"
        />
        {/* Form select for gender */}
        <FormSelect
          name="gender"
          options={["Select a gender", "male", "female"]}
        />
        {/* Form controll for address */}
        <FormControll
          name="address"
          type="text"
          placeholder="Enter your address"
        />
        {/* Form controll for mobile */}
        <FormControll
          name="mobile"
          type="text"
          placeholder="Enter your mobile number"
        />
        {/* Form button */}
        <FormButton title="Update" />
      </MyForm>
    </Modal>
  );
};

export default ProfileInfoUpdateModal;
