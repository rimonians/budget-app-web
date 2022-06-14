import React from "react";
import Modal from "../Shared/Modal";
import MyForm, {
  FormHeading,
  FormControll,
  FormSelect,
  FormButton,
} from "../Shared/MyForm";
import { validationSchema } from "../../validations/BudgetUpdate";
import useBudgets from "../../hooks/useBudgets";

const BudgetUpdateModal = ({ trackedBudget, setTrackedBudget }) => {
  const { updateBudget } = useBudgets();

  if (!trackedBudget) return null;
  const { _id, title, type, amount } = trackedBudget;

  return (
    <Modal modalId="budgetUpdateModal" setTrackedBudget={setTrackedBudget}>
      <MyForm
        initialValues={{ title, type, amount }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          updateBudget(values, actions, _id, setTrackedBudget)
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
