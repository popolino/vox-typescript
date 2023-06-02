// @ts-ignore
import classes from "./Paginator.module.scss";
import * as React from "react";

type TProps = {
  totalUsersCount: number;
  pageCount: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  setPreviousPage: () => void;
  selectCurrentPage: (page: number) => void;
  setNextPage: () => void;
  onPageCountChanged: (event: any) => void;
};

const Paginator: React.FC<TProps> = ({
  totalUsersCount,
  pageCount,
  currentPage,
  setNextPage,
  setPreviousPage,
  onPageChanged,
  selectCurrentPage,
  onPageCountChanged,
}) => {
  let pageCountSize = Math.ceil(totalUsersCount / pageCount);
  let pages: Array<number> = [];
  for (let i = 1; i <= pageCountSize && i <= 5; i++) {
    pages.push(i);
  }
  const lastElementOnPage =
    currentPage !== 1 ? pageCount * currentPage : pageCount;
  const firstElementOnPage = currentPage * pageCount - pageCount + 1;
  return (
    <div className={classes.pagination}>
      <div className={classes["top-panel"]}>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            onPageChanged(currentPage);
            setPreviousPage();
          }}
        >
          ❮
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={currentPage === p ? classes.selected : ""}
            onClick={() => {
              selectCurrentPage(p);
              onPageChanged(currentPage);
            }}
          >
            {p}
          </button>
        ))}
        {currentPage > 5 && currentPage < pageCountSize ? (
          <>
            <p>...</p>
            <button
              className={classes.selected}
              onClick={() => {
                onPageChanged(currentPage);
              }}
            >
              {currentPage}
            </button>
          </>
        ) : (
          <p>...</p>
        )}

        <button
          className={currentPage === pageCountSize ? classes.selected : ""}
          onClick={() => {
            selectCurrentPage(pageCountSize);
            onPageChanged(pageCountSize);
          }}
        >
          {pageCountSize}
        </button>
        <button
          onClick={() => {
            onPageChanged(currentPage);
            setNextPage();
          }}
          disabled={currentPage === pageCountSize}
        >
          ❯
        </button>
      </div>
      <div className={classes["bottom-panel"]}>
        <select
          name="elements"
          id="v"
          defaultValue={"rowsPerPages"}
          onChange={(event) => {
            onPageCountChanged(event.target.value);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <p>{`Results: ${firstElementOnPage} - ${lastElementOnPage} of ${totalUsersCount}`}</p>
      </div>
    </div>
  );
};

export default Paginator;
