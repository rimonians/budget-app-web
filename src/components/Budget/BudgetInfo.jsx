import React from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import useBudgets from "../../hooks/useBudgets";
import usePaginate from "../../hooks/usePaginate";
import ReactPaginate from "react-paginate";

const BudgetInfo = ({ setTrackedBudget }) => {
  const { copyBudgets } = useBudgets();

  const { currentItems, pageCount, handlePageClick } = usePaginate(
    copyBudgets,
    5
  );

  if (!copyBudgets.length) return null;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Title</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((budget, index) => (
                <TableItem
                  key={budget._id}
                  budget={budget}
                  index={index}
                  setTrackedBudget={setTrackedBudget}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          className="flex items-center gap-4"
          pageClassName="h-8 w-8 border-2 rounded-md flex justify-center items-center overflow-hidden"
          activeClassName="bg-primary text-white"
          pageLinkClassName="flex justify-center items-center h-8 w-8"
        />
      </div>
    </>
  );
};

const TableItem = ({ budget, index, setTrackedBudget }) => {
  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>{budget.title}</td>
      <td>
        <span
          className={`${
            budget.type === "income" ? "text-primary" : "text-error"
          }`}
        >
          {budget.type}
        </span>
      </td>
      <td>{budget.amount}</td>
      <td>
        <label
          htmlFor="budgetUpdateModal"
          onClick={() => setTrackedBudget(budget)}
        >
          <IoCreateOutline
            className="text-primary m-auto cursor-pointer"
            htmlFor="budgetUpdateModal"
          />
        </label>
      </td>
      <td>
        <label
          htmlFor="budgetDeleteModal"
          onClick={() => setTrackedBudget(budget)}
        >
          <IoTrashOutline className="text-error m-auto cursor-pointer" />
        </label>
      </td>
    </tr>
  );
};

export default BudgetInfo;
