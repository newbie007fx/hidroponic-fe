import Content from "./Content";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BaseLayout = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <Content />
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
      <ToastContainer />
    </div>
  );
};

export default BaseLayout;
