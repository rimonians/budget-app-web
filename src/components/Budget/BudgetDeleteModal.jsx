import React from "react";
import Modal from "../Shared/Modal";
import useBudgets from "../../hooks/useBudgets";

const BudgetDeleteModal = ({ trackedBudget, setTrackedBudget }) => {
  const { deleteBudget } = useBudgets();

  if (!trackedBudget) return null;
  const { _id } = trackedBudget;

  return (
    <Modal modalId="budgetDeleteModal" setTrackedBudget={setTrackedBudget}>
      <div className="flex flex-col gap-4">
        <p className="text-3xl text-primary font-bold">Are you sure?</p>
        <p className="text-sm text-secondary">
          To delete budget of id{" "}
          <span className="text-primary font-semibold">{_id}</span>
        </p>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => deleteBudget(_id, setTrackedBudget)}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BudgetDeleteModal;
