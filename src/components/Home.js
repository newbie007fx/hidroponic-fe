import AutomationHistory from "./widgets/AutomationHistory";
import MeasureValue from "./widgets/MeasureValue";
import NutrionAreaChart from "./widgets/NutrionAreaChart";
import NutrionRadialChart from "./widgets/NutrionRadialChart";
import PlantStatus from "./widgets/PlantStatus";
import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import plantService from "../services/plant.service";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [activePlant, setActivePlant] = useState(null);
  
  useEffect(() => {
    plantService
      .getActivePlant()
      .then((response) => {
        setActivePlant(response.data.data ?? null);
      })
      .catch(function (error) {
        if (error.response) {
          let data = error.response.data;
          if (data.error.code !== 40401) {
            setActivePlant(null);
            Promise.reject(error);
          }
        }
      });
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12 mb-4 order-0">
          <PlantStatus activePlant={activePlant} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 order-2 order-md-3 order-lg-2">
          <div className="row">
            <div className="col-3 mb-3">
              <MeasureValue
                dataType="water_ph"
                image="chart-success.png"
                alt="credit-card"
                label="PH"
              />
            </div>
            <div className="col-3 mb-3">
              <MeasureValue
                dataType="water_temperature"
                image="wallet-info.png"
                alt="credit-card"
                label="Temperature"
                unit="°C"
              />
            </div>
            <div className="col-3 mb-3">
              <MeasureValue
                dataType="nutrition_water_volume"
                image="paypal.png"
                alt="credit-card"
                label="Nutrition Water Vol"
                unit="&#13220;"
              />
            </div>
            <div className="col-3 mb-3">
              <MeasureValue
                dataType="raw_water_volume"
                image="cc-primary.png"
                alt="credit-card"
                label="Raw Water Vol"
                unit="&#13220;"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12 order-2 order-md-3 order-lg-2">
              <div className="card">
                <div className="row row-bordered g-0">
                  <div className="col-md-8">
                    <NutrionAreaChart />
                  </div>
                  <div className="col-md-4">
                    <NutrionRadialChart activePlant={activePlant} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 order-2">
          <AutomationHistory />
        </div>
      </div>
    </>
  );
};

export default Home;
