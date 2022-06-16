import React from "react";
import { useSelector } from "react-redux";
import { IoDuplicateOutline } from "react-icons/io5";

const BudgetHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-2xl">
          Hey{" "}
          <span className="text-primary font-semibold">{user?.username}</span>
        </h3>
        <p className="text-secondary">Here is your budget info</p>
      </div>
      <div>
        <label htmlFor="budgetCreateModal">
          <IoDuplicateOutline className="text-2xl text-primary cursor-pointer" />
        </label>
      </div>
    </div>
  );
};

export default BudgetHeader;
