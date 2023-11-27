import style from "./Paginate.module.css";

const Paginate = ({ currentPage, maxPages, initialFilters, setInitialFilters, initialPageSet, setInitialPageSet }) => {
  const pageNumbers = [];
  let number = 1;

  while(pageNumbers.length < maxPages){
    pageNumbers.push(number)
    number+= 1
  }

  const handlePageClick = (pageNumber) => {
    setInitialPageSet(pageNumber);
  };

  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        {pageNumbers?.map((pageNumber) => ( // Cambié el nombre a pageNumber
          <li key={pageNumber}>
            <button
              className={pageNumber === currentPage ? style.activePage : style.p}
              onClick={()=>handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
