import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Shared/Loading";
import BudgetHeader from "../components/Budget/BudgetHeader";
import BudgetStat from "../components/Budget/BudgetStat";
import BudgetFilter from "../components/Budget/BudgetFilter";
import BudgetInfo from "../components/Budget/BudgetInfo";
import BudgetCreateModal from "../components/Budget/BudgetCreateModal";
import BudgetUpdateModal from "../components/Budget/BudgetUpdateModal";
import BudgetDeleteModal from "../components/Budget/BudgetDeleteModal";

const Budget = () => {
  const { loading } = useSelector((state) => state.budget);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <BudgetHeader />
      <BudgetStat />
      <BudgetFilter />
      <BudgetInfo />
      <BudgetCreateModal />
      <BudgetUpdateModal />
      <BudgetDeleteModal />
    </div>
  );
};

export default Budget;
