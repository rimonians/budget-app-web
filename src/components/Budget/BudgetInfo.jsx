import React, { useState, useEffect } from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { trackBudget } from "../../redux/features/Budget/budgetSlice";
import ReactPaginate from "react-paginate";

const BudgetInfo = () => {
  const { budgets } = useSelector((state) => state.budget);

  // Responsible for pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(budgets.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(budgets.length / itemsPerPage));
  }, [itemOffset, budgets]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % budgets.length;
    setItemOffset(newOffset);
  };

  if (!budgets.length) return null;

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
                <TableItem key={budget._id} budget={budget} index={index} />
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

const TableItem = ({ budget, index }) => {
  const dispatch = useDispatch();

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
          onClick={() => dispatch(trackBudget(budget))}
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
          onClick={() => dispatch(trackBudget(budget))}
        >
          <IoTrashOutline className="text-error m-auto cursor-pointer" />
        </label>
      </td>
    </tr>
  );
};

export default BudgetInfo;
