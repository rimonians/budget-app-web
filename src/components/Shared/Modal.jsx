import React from "react";

const ProfileInfoUpdateModal = ({ modalId, setTrackedBudget, children }) => (
  <>
    <input type="checkbox" id={modalId} className="modal-toggle hidden" />
    <div className="modal modal-middle">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <label
            htmlFor={modalId}
            className="btn btn-error"
            onClick={() => setTrackedBudget(null)}
          >
            Close!
          </label>
        </div>
      </div>
    </div>
  </>
);

export default ProfileInfoUpdateModal;
