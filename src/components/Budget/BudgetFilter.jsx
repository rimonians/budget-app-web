import React from "react";
import useBudgets from "../../hooks/useBudgets";
import usePaginate from "../../hooks/usePaginate";

const BudgetFilter = () => {
  const { budgets, copyBudgets, activeFilterType, handleFilterBudgets } =
    useBudgets();

  if (!budgets.length) return null;

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="capitalize font-semibold text-md">
          {activeFilterType} ({copyBudgets.length})
        </h3>
      </div>
      <div className="flex gap-2">
        {["all", "income", "expense"].map((item) => (
          <FilterButton
            key={Math.random()}
            text={item.toString()}
            activeFilterType={activeFilterType}
            handleFilterBudgets={handleFilterBudgets}
          />
        ))}
      </div>
    </div>
  );
};

const FilterButton = ({ text, activeFilterType, handleFilterBudgets }) => (
  <button
    className={`border btn-xs rounded-md capitalize ${
      activeFilterType === text && "bg-primary text-base-100"
    }`}
    onClick={() => handleFilterBudgets(text)}
  >
    {text}
  </button>
);

export default BudgetFilter;
