import React, { useState, useEffect } from "react";

const usePaginate = (dataItems, itemsPerPage) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(dataItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dataItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataItems.length;
    setItemOffset(newOffset);
  };

  return {
    currentItems,
    pageCount,
    handlePageClick,
  };
};

export default usePaginate;
