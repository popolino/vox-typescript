import React, { useEffect, useRef } from "react";

const useClickAway = (
  ref: React.RefObject<HTMLDivElement>,
  onClickAway: (event: MouseEvent) => void
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        savedCallback.current(event);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [ref]);
};

export default useClickAway;
