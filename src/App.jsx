import React from "react";
import "./App.css";
import { Report, Header, Register, Posts } from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookProvider from "./contexts/BookProvider";

function App() {
  return (
    <BookProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Report />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;
