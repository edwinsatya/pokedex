import { useMemo } from "react";

const useComputedId = (id) => {
  return useMemo(() => {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return `${id}`;
    }
  }, [id]);
};

export default useComputedId;
