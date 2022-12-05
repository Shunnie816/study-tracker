import React, { useState } from "react";
import "./App.css";
import { Report, Header, Register, Posts } from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [time, setTime] = useState("");
  const [textbook, setTextbook] = useState([]);
  const [bookId, setBookId] = useState("");
  const [dataBook, setDataBook] = useState([]);
  const [studyContent, setStudyContent] = useState("");
  const [post, setPost] = useState([]);

  return (
    <>
      <Header />
      <div>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Report
                  time={time}
                  onSelect={setTime}
                  bookId={bookId}
                  setId={setBookId}
                  data={dataBook}
                  setData={setDataBook}
                  content={studyContent}
                  inputContent={setStudyContent}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  value={textbook}
                  onSelect={setTextbook}
                  data={dataBook}
                  setData={setDataBook}
                />
              }
            />
            <Route
              path="/posts"
              element={
                <Posts
                  data={post}
                  setData={setPost}
                  book={textbook}
                  setBook={setTextbook}
                  bookId={bookId}
                  setId={setBookId}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
