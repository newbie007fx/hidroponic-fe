import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Home";
import BoardUser from "../BoardUser";
import BoardAdmin from "../BoardAdmin";
import IndexPlant from "../plants/Index";

const Content = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/plants" element={<IndexPlant />} />
        <Route path="/admin" element={<BoardAdmin />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
};

export default Content;
