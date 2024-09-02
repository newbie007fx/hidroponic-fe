import React, { useEffect, useState } from "react";
import plantService from "../../services/plant.service";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PLANT_GROWTH, PLANT_GROWTH_MAP, PLANT_STATUS, PLANT_STATUS_MAP, PLANT_TYPE, PLANT_TYPE_MAP } from "../../constants/plant";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { toast } from "react-toastify";

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import HarvestModel from "./HarvestModel";
import moment from "moment";

const DetailPlant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [plant, setPlant] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    plantService.getPlantByID(id).then(
      (response) => {
        let data = response.data?.data;
        if (data) {
          let nutritionTargetMap = new Map();
          data.nutrition_targets.forEach(target => {
            nutritionTargetMap.set(target.plant_age, target)
          });
          data.nutrition_target_map = nutritionTargetMap
          setPlant(data);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }, [id]);

  const renderTargetPerDays = () => {
    let rows = [];
    for (let i = plant?.plant_age; i <= plant?.harvest_age; i++) {
      let columns = [];
      let maxPoint = i + 4;
      while (i < maxPoint && i <= plant?.harvest_age) {
        let target = plant?.nutrition_target_map.get(i);
        columns.push(<td key={i}>Day {i}</td>);
        columns.push(<td key={i + "-value"} className="value">{Math.floor(target?.target_ppm + target?.additional_ppm)} PPM</td>);
        i++;
      }

      rows.push(<tr key={i}>
        {columns}
      </tr>);
    }

    return rows;
  }

  const deletePlant = () => {
    plantService.deletePlant(plant.id).then(
      (response) => {
        let data = response.data?.is_success;
        if (data) {
          toast.success("plant has been deleted");
          navigate("/plants")
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  const updatePlantStatus = (status) => {
    let data = {
      status: status,
      id: plant.id
    };
    plantService.updatePlantStatus(data).then(
      (response) => {
        let data = response.data?.is_success;
        if (data) {
          toast.success("plant has been successfully updated");
          navigate("/plants")
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  const updatePlantGrowth = () => {
    plantService.updatePlantGrowth(plant.id).then(
      (response) => {
        let data = response.data?.is_success;
        if (data) {
          toast.success("plant growth has been successfully updated");
          navigate("/plants")
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  const confirm = (event, message, acceptAction) => {
    confirmDialog({
      trigger: event.currentTarget,
      message: message,
      header: 'Confirmation',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: acceptAction,
    });
  }

  const toggle = () => {
    setOpenModal(!openModal);
  }

  return (
    <>
      <div className="row">
        <HarvestModel
          id={plant?.id}
          isOpen={openModal}
          toggle={toggle}
        />
        <ConfirmDialog />
        <div className="col-lg-9 mb-4 order-0">
          <div className="card">
            <h5 className="card-header">Detail Plant</h5>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table">
                  <tbody className="table-border-bottom-0">
                    <tr>
                      <td>ID</td>
                      <td className="value">{plant?.id}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td className="value">{plant?.name}</td>
                    </tr>
                    <tr>
                      <td>Varieties</td>
                      <td className="value">{plant?.varieties}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td className="value">{plant?.description}</td>
                    </tr>
                    <tr>
                      <td>Plant Type</td>
                      <td className="value">{PLANT_TYPE_MAP[plant?.plant_type]}</td>
                    </tr>
                    <tr>
                      <td>Plant Age</td>
                      <td className="value">{plant?.plant_age} Days</td>
                    </tr>
                    <tr>
                      <td>Harvest Age</td>
                      <td className="value">{plant?.harvest_age} Days</td>
                    </tr>
                    <tr>
                      <td>Generative Age</td>
                      <td className="value">{plant?.generative_age} Days</td>
                    </tr>
                    <tr>
                      <td>Nutrition Minimal</td>
                      <td className="value">{plant?.nutrition_min} PPM</td>
                    </tr>
                    <tr>
                      <td>Nutrition Maximal</td>
                      <td className="value">{plant?.nutrition_max} PPM</td>
                    </tr>
                    <tr>
                      <td>Nutrition Adjustment</td>
                      <td className="value">{plant?.nutrition_adjustment} PPM</td>
                    </tr>
                    <tr>
                      <td>PH Level</td>
                      <td className="value">{plant?.ph_level}</td>
                    </tr>
                    <tr>
                      <td>Temperature</td>
                      <td className="value">{plant?.temperature} °C</td>
                    </tr>
                    <tr>
                      <td>Current Growth</td>
                      <td className="value">{PLANT_GROWTH_MAP[plant?.current_growth]}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td className="value">{PLANT_STATUS_MAP[plant?.status]}</td>
                    </tr>
                    <tr>
                      <td>Created At</td>
                      <td className="value">{moment(plant?.created_at).format("DD-MMMM-YYYY HH:mm:ss")}</td>
                    </tr>
                    <tr>
                      <td>Updated At</td>
                      <td className="value">{moment(plant?.updated_at).format("DD-MMMM-YYYY HH:mm:ss")}</td>
                    </tr>
                    <tr>
                      <td>Activated At</td>
                      <td className="value">{plant?.activated_at ? moment(plant.activated_at).format("DD-MMMM-YYYY HH:mm:ss") : ""}</td>
                    </tr>
                    <tr>
                      <td>Harvested At</td>
                      <td className="value">{plant?.harvested_at ? moment(plant.harvested_at).format("DD-MMMM-YYYY HH:mm:ss") : ""}</td>
                    </tr>
                    <tr>
                      <td>Yields</td>
                      <td className="value">{plant?.yields}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mb-4 order-0">
          <div className="card">
            <h5 className="card-header">Actions</h5>
            <div className="card-body">
              <div className="row gy-3">
                <div className="d-grid col-md-12 gap-2">
                  {(plant?.status === PLANT_STATUS.STATUS_CREATED || plant?.status === PLANT_STATUS.STATUS_DEACTIVATED) && <button onClick={(event) => confirm(event, "are you sure want to activate this plant?", () => updatePlantStatus(PLANT_STATUS.STATUS_ACTIVATED))} type="button" className="btn btn-success">
                    Activate
                  </button>}
                  {plant?.status === PLANT_STATUS.STATUS_ACTIVATED &&
                    <><button onClick={(event) => confirm(event, "are you sure want to deactivate this plant?", () => updatePlantStatus(PLANT_STATUS.STATUS_DEACTIVATED))} type="button" className="btn btn-warning">
                      Deactivate
                    </button>
                      <button onClick={toggle} type="button" className="btn btn-dark">
                        Harvest
                      </button>
                      {plant?.current_growth === PLANT_GROWTH.VEGETATIVE && plant?.plant_type === PLANT_TYPE.FRUIT_CROP &&
                        <button onClick={(event) => confirm(event, "are you sure want to update growth for this plant?", () => updatePlantGrowth())} type="button" className="btn btn-primary">
                          Update Growth
                        </button>}
                    </>
                  }
                  {plant?.status !== PLANT_STATUS.STATUS_HARVESTED &&
                    <>
                      <Link to={"/plants/" + plant?.id + "/edit"} className="d-grid">
                        <button type="button" className="btn btn-info">
                          Update Plant
                        </button>
                      </Link>
                      <Link to={"/plants/" + plant?.id + "/edit-target"} className="d-grid">
                        <button type="button" className="btn btn-info">
                          Update Nutrition Target
                        </button>

                      </Link>
                    </>
                  }
                  {plant?.status !== PLANT_STATUS.STATUS_ACTIVATED && <button type="button" onClick={(event) => confirm(event, "are you sure want to delete this plant?", deletePlant)} className="btn btn-danger">
                    Delete
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 mb-4 order-0">
          <div className="card">
            <h5 className="card-header">Nutrition Target</h5>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table">
                  <tbody className="table-border-bottom-0">
                    {renderTargetPerDays()}
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

export default DetailPlant;
