import React from "react";
import { Route, Routes } from "react-router-dom";
import CreatePage from './CreatePage';
import DetailPage from "./DetailPage";
import ListPage from "./ListPage";
import UpdatePage from "./UpdatePage";
const App = () => {
  return (
    <Routes>
      <Route path="/list" element={<ListPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
    </Routes>
  );
};

export default App;
