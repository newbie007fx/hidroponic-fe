import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Home";
import UpdateInstallationConfig from "../installationconfig/Update";
import IndexPlant from "../plants/Index";
import CreatePlant from "../plants/Create";
import DetailPlant from "../plants/Detail";
import UpdatePlant from "../plants/Update";
import UpdatePlantNutritionTarget from "../plants/UpdateTarget";
import IndexAutomation from "../automation/Index";
import DetailAutomation from "../automation/Detail";

const Content = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plants" element={<IndexPlant />} />
        <Route path="/plants/create" element={<CreatePlant />} />
        <Route path="/plants/:id" element={<DetailPlant />} />
        <Route path="/plants/:id/edit" element={<UpdatePlant />} />
        <Route path="/plants/:id/edit-target" element={<UpdatePlantNutritionTarget />} />
        <Route path="/installation-config" element={<UpdateInstallationConfig />} />
        <Route path="/automations" element={<IndexAutomation />} />
        <Route path="/automations/:id" element={<DetailAutomation />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
};

export default Content;
