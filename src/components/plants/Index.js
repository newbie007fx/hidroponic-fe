import React, { useEffect, useState } from "react";
import plantService from "../../services/plant.service";
import { Link } from "react-router-dom";
import { PLANT_STATUS_MAP, PLANT_TYPE_MAP } from "../../constants/plant";

const IndexPlant = () => {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    plantService.getAllPlant().then(
      (response) => {
        if (response.data.data) {
          setPlants(response.data.data);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12 mb-4 order-0">
        <div className="card">
          <h5 className="card-header">Plants</h5>
          <div className="card-body">
            <div className="button-wrapper">
              <Link to={"/plants/create"}>
                <button
                  type="button"
                  className="btn btn-secondary mb-4"
                >
                  <i className="bx bx-reset d-block d-sm-none"></i>
                  <span className="d-none d-sm-block">Add New Plant</span>
                </button>
              </Link>
            </div>

            <div className="table-responsive text-nowrap">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Varieties</th>
                    <th>Plant Type</th>
                    <th>Planting Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {plants &&
                    plants.map((plant, index) => (
                      <tr key={index}>
                        <td>{plant.name}</td>
                        <td>{plant.varieties}</td>
                        <td>{PLANT_TYPE_MAP[plant.plant_type]}</td>
                        <td>{plant.harvest_age} days</td>
                        <td>{PLANT_STATUS_MAP[plant.status]}</td>
                        <td>
                          <Link to={"/plants/" + plant.id} className="nav-link">
                            <button
                              type="button"
                              className="btn p-0 dropdown-toggle hide-arrow"
                            >
                              <i className="bx bx-show-alt me-1"></i> Detail
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPlant;
