import React from "react";
import { useDispatch } from "react-redux";
import { trackBudget } from "../../redux/features/Budget/budgetSlice";

const Modal = ({ modalId, children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle hidden" />
      <div className="modal modal-middle">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <label
              htmlFor={modalId}
              className="btn btn-error"
              onClick={() => dispatch(trackBudget(null))}
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
