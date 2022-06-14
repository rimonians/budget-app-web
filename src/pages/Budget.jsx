import React, { useState } from "react";
import BudgetHeader from "../components/Budget/BudgetHeader";
import BudgetStat from "../components/Budget/BudgetStat";
import BudgetFilter from "../components/Budget/BudgetFilter";
import BudgetInfo from "../components/Budget/BudgetInfo";
import BudgetCreateModal from "../components/Budget/BudgetCreateModal";
import BudgetUpdateModal from "../components/Budget/BudgetUpdateModal";
import BudgetDeleteModal from "../components/Budget/BudgetDeleteModal";
import useBudgets from "../hooks/useBudgets";
import Loading from "../components/Shared/Loading";

const Budget = () => {
  const { loading } = useBudgets();

  const [trackedBudget, setTrackedBudget] = useState(null);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <BudgetHeader />
      <BudgetStat />
      <BudgetFilter />
      <BudgetInfo setTrackedBudget={setTrackedBudget} />
      <BudgetCreateModal />
      <BudgetUpdateModal
        trackedBudget={trackedBudget}
        setTrackedBudget={setTrackedBudget}
      />
      <BudgetDeleteModal
        trackedBudget={trackedBudget}
        setTrackedBudget={setTrackedBudget}
      />
    </div>
  );
};

export default Budget;
