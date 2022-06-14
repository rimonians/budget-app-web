import React from "react";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ dataItems, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(dataItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataItems.length;
    setItemOffset(newOffset);
  };

  const Paginate = (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );

  return { currentItems, Paginate };
};

export default PaginatedItems;
