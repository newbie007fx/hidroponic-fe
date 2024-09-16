import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from './components/layout/BaseLayout';
import Login  from "./pages/Login";
import Page404 from "./pages/Page404";

const App = () => {
  return (
    <Router>
      <div>
          <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route path="*" name="Home" element={<BaseLayout />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
