import React from "react";

import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import AddRecord from "./components/addRecord";
import EditRecord from "./components/editRecord";
import Display from "./components/displayRecord";


const App = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<Display />} />
        <Route path="/edit/:id" element={<EditRecord />} />
        <Route path="/new" element={<AddRecord />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
