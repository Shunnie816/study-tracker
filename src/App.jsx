import React from "react";
import "./App.css";
import { Report, Header, Register, Posts } from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookProvider from "./contexts/BookProvider";

function App() {
  return (
    <BookProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Report />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;
