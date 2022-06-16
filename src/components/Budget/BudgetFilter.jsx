import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterBudgets } from "../../redux/features/Budget/budgetSlice";

const BudgetFilter = () => {
  const { budgets, budgetsSafe, filterBy } = useSelector(
    (state) => state.budget
  );

  if (!budgetsSafe.length) return null;

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="capitalize font-semibold text-md">
          {filterBy} ({budgets.length})
        </h3>
      </div>
      <div className="flex gap-2">
        {["all", "income", "expense"].map((item) => (
          <FilterButton key={Math.random()} text={item.toString()} />
        ))}
      </div>
    </div>
  );
};

const FilterButton = ({ text }) => {
  const { filterBy } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  return (
    <button
      className={`border btn-xs rounded-md capitalize ${
        filterBy === text && "bg-primary text-base-100"
      }`}
      onClick={() => dispatch(filterBudgets(text))}
    >
      {text}
    </button>
  );
};

export default BudgetFilter;
