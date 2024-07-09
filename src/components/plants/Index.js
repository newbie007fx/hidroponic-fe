import React, { useEffect, useState } from "react";
import plantService from "../../services/plant.service";

const IndexPlant = () => {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    plantService.getAllPlant().then(
      (response) => {
        setPlants(response.data.data);
      },
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
            <div class="button-wrapper">
              <button
                type="button"
                className="btn btn-outline-secondary account-image-reset mb-4"
              >
                <i className="bx bx-reset d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Add New Plant</span>
              </button>
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
                        <td>{plant.plant_type}</td>
                        <td>{plant.harvest_age} days</td>
                        <td>{plant.status}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn p-0 dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                            >
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#/">
                                <i className="bx bx-edit-alt me-1"></i> Edit
                              </a>
                              <a className="dropdown-item" href="#/">
                                <i className="bx bx-show-alt me-1"></i> Detail
                              </a>
                            </div>
                          </div>
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
