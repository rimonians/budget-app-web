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
} from "../../validations/BudgetCreate";
import { useDispatch, useSelector } from "react-redux";
import { createBudget } from "../../redux/features/Budget/budgetSlice";

const BudgetCreateModal = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Modal modalId="budgetCreateModal">
      <MyForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          dispatch(createBudget({ values, actions, token }))
        }
      >
        {/* Form heading */}
        <FormHeading title="Create budgets" slogan="It's easy & free" />
        {/* Form controll for title */}
        <FormControll
          name="title"
          type="text"
          placeholder="Enter budget title"
        />
        {/* Form select for type */}
        <FormSelect
          name="type"
          options={["Select a budget type", "income", "expense"]}
        />
        {/* Form controll for amount */}
        <FormControll
          name="amount"
          type="number"
          placeholder="Enter budget amount"
        />
        {/* Form button */}
        <FormButton title="Create" />
      </MyForm>
    </Modal>
  );
};

export default BudgetCreateModal;
