import React from "react";
import useBudgets from "../../hooks/useBudgets";
import { GiReceiveMoney, GiPayMoney, GiMoneyStack } from "react-icons/gi";

const BudgetStat = () => {
  const { budgets } = useBudgets();

  const income = budgets.reduce((acc, cur) => {
    if (cur.type === "income") {
      return acc + cur.amount;
    }
    return acc;
  }, 0);

  const expense = budgets.reduce((acc, cur) => {
    if (cur.type === "expense") {
      return acc + cur.amount;
    }
    return acc;
  }, 0);

  const saving = income - expense;

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <BudgetStatItem
        data={{ type: "income", value: income }}
        Icon={GiReceiveMoney}
      />
      <BudgetStatItem
        data={{ type: "expense", value: expense }}
        Icon={GiPayMoney}
      />
      <BudgetStatItem
        data={{ type: "saving", value: saving }}
        Icon={GiMoneyStack}
      />
    </div>
  );
};

const BudgetStatItem = ({ data, Icon }) => {
  const { type, value } = data;

  let bgColor;
  if (type === "income") {
    bgColor = "bg-primary";
  } else if (type === "expense") {
    bgColor = "bg-error";
  } else {
    bgColor = "bg-accent";
  }

  return (
    <div
      className={`flex-1 flex flex-col gap-2 items-center p-4 rounded-md ${bgColor}`}
    >
      <Icon className="text-3xl text-base-100 capitalize font-semibold" />
      <h3 className="text-xl text-base-100 capitalize font-semibold">{type}</h3>
      <p className="text-lg text-base-100 capitalize font-semibold">{value}</p>
    </div>
  );
};

export default BudgetStat;
