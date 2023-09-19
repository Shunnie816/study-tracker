import React, { useState } from "react";
import AuthContext from "./AuthContext";

const BookProvider = ({ children }) => {
  const [textbook, setTextbook] = useState([]);
  const [bookId, setBookId] = useState("");
  const [dataBook, setDataBook] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        textbook,
        setTextbook,
        bookId,
        setBookId,
        dataBook,
        setDataBook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default BookProvider;
