import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import moment from "moment";
import automationService from "../../services/automation.service";

const DetailAutomation = () => {
  const { id } = useParams();
  const [automation, setAutomation] = useState();

  useEffect(() => {
    automationService.getAutomationByID(id).then(
      (response) => {
        let data = response.data?.data;
        if (data) {
          setAutomation(data);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-lg-8 mb-4 order-0">
          <div className="card">
            <h5 className="card-header">Detail Automation</h5>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table">
                  <tbody className="table-border-bottom-0">
                    <tr>
                      <td>Plant ID</td>
                      <td className="value">{automation?.plant_id}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td className="value">{automation?.plant.name}</td>
                    </tr>
                    <tr>
                      <td>Varieties</td>
                      <td className="value">{automation?.plant.varieties}</td>
                    </tr>
                    <tr>
                      <td>Target PPM</td>
                      <td className="value">{automation?.target_ppm} PPM</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="value">{automation?.status}</td>
                    </tr>
                    <tr>
                      <td>Triggered At</td>
                      <td className="value">{moment(automation?.triggered_at).format("DD-MMMM-YYYY HH:mm:ss")}</td>
                    </tr>
                    <tr>
                      <td>Finished At</td>
                      <td className="value">{automation?.finished_at ? moment(automation.finished_at).format("DD-MMMM-YYYY HH:mm:ss") : ""}</td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td className="value">{automation?.duration} Seconds</td>
                    </tr>
                    <tr>
                      <td>Accuration</td>
                      <td className="value">{automation?.accuration}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mb-4 order-0">
          <div className="card">
            <h5 className="card-header">Data Before Automation</h5>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table">
                  <tbody className="table-border-bottom-0">
                    <tr>
                      <td>Nutrition Water PPM</td>
                      <td className="value">{automation?.before_data?.nutrition_water_ppm} PPM</td>
                    </tr>
                    <tr>
                      <td>Nutrition Water Volume</td>
                      <td className="value">{automation?.before_data?.nutrition_water_volume} &#13220;</td>
                    </tr>
                    <tr>
                      <td>Water PH</td>
                      <td className="value">{automation?.before_data?.water_ph}</td>
                    </tr>
                    <tr>
                      <td>Water Temperature</td>
                      <td className="value">{automation?.before_data?.water_temperature} °C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4 order-0">
          <div className="card">
            <h5 className="card-header">Data After Automation</h5>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table">
                  <tbody className="table-border-bottom-0">
                    <tr>
                      <td>Nutrition Water PPM</td>
                      <td className="value">{automation?.after_data?.nutrition_water_ppm} PPM</td>
                    </tr>
                    <tr>
                      <td>Nutrition Water Volume</td>
                      <td className="value">{automation?.after_data?.nutrition_water_volume} &#13220;</td>
                    </tr>
                    <tr>
                      <td>Water PH</td>
                      <td className="value">{automation?.after_data?.water_ph}</td>
                    </tr>
                    <tr>
                      <td>Water Temperature</td>
                      <td className="value">{automation?.after_data?.water_temperature} °C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailAutomation;
