import classes from "./Paginator.module.scss";
import * as React from "react";
import { InputLabel, NativeSelect } from "@mui/material";
import SvgSelector from "../svgSelector/SvgSelector";

type TProps = {
  totalUsersCount: number;
  pageCount: number;
  currentPage: number;
  paginationMode: boolean;
  onPageChanged: (page: number) => void;
  selectCurrentPage: (page: number) => void;
  onPageCountChanged: (event: any) => void;
  setPaginationMode: (pagination: boolean) => void;
};

const Paginator: React.FC<TProps> = ({
  totalUsersCount,
  pageCount,
  currentPage,
  onPageChanged,
  selectCurrentPage,
  onPageCountChanged,
  setPaginationMode,
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
      <button
        className={classes.close}
        onClick={() => setPaginationMode(false)}
      >
        <SvgSelector id="close" />
      </button>
      <div className={classes["top-panel"]}>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            onPageChanged(currentPage - 1);
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
              onPageChanged(p);
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
            onPageChanged(currentPage + 1);
          }}
          disabled={currentPage === pageCountSize}
        >
          ❯
        </button>
      </div>

      <div className={classes["bottom-panel"]}>
        <div className="mui-select">
          <InputLabel variant="standard">Rows</InputLabel>
          <NativeSelect
            defaultValue={10}
            onChange={(event) => {
              onPageCountChanged(event.target.value);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={100}>30</option>
          </NativeSelect>
        </div>
        <p>{`Results: ${firstElementOnPage} - ${lastElementOnPage} of ${totalUsersCount}`}</p>
      </div>
    </div>
  );
};

export default Paginator;
