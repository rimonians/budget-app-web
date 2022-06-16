import React from "react";
import Modal from "../Shared/Modal";
import MyForm, {
  FormHeading,
  FormControll,
  FormSelect,
  FormButton,
} from "../Shared/MyForm";
import { validationSchema } from "../../validations/BudgetUpdate";
import { useSelector, useDispatch } from "react-redux";
import { updateBudget } from "../../redux/features/Budget/budgetSlice";

const BudgetUpdateModal = () => {
  const { token } = useSelector((state) => state.auth);
  const { tracked } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  if (!tracked) return null;
  const { _id, title, type, amount } = tracked;

  return (
    <Modal modalId="budgetUpdateModal">
      <MyForm
        initialValues={{ title, type, amount }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          dispatch(updateBudget({ values, actions, _id, token }))
        }
      >
        {/* Form heading */}
        <FormHeading title="Update budgets" slogan="It's easy & free" />
        {/* Form controll for title */}
        <FormControll
          name="title"
          type="text"
          placeholder="Enter budget title"
        />
        {/* Form select for type */}
        <FormSelect
          name="type"
          options={["Select a gender", "income", "expense"]}
        />
        {/* Form controll for amount */}
        <FormControll
          name="amount"
          type="number"
          placeholder="Enter budget amount"
        />
        {/* Form button */}
        <FormButton title="Update" />
      </MyForm>
    </Modal>
  );
};

export default BudgetUpdateModal;
