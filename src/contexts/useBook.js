import { useContext } from "react";
import AuthContext from "./AuthContext";

const useBook = () => {
  return useContext(AuthContext);
};

export default useBook;
