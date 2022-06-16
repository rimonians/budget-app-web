import React from "react";
import Modal from "../Shared/Modal";
import { useSelector, useDispatch } from "react-redux";
import { deleteBudget } from "../../redux/features/Budget/budgetSlice";

const BudgetDeleteModal = () => {
  const { token } = useSelector((state) => state.auth);
  const { tracked } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  if (!tracked) return null;
  const { _id } = tracked;

  return (
    <Modal modalId="budgetDeleteModal">
      <div className="flex flex-col gap-4">
        <p className="text-3xl text-primary font-bold">Are you sure?</p>
        <p className="text-sm text-secondary">
          To delete budget of id{" "}
          <span className="text-primary font-semibold">{_id}</span>
        </p>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(deleteBudget({ _id, token }))}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BudgetDeleteModal;
