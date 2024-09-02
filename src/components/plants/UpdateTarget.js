import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import plantService from "../../services/plant.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePlantNutritionTarget = () => {
  let navigate = useNavigate();

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState({});
  const [plant, setPlant] = useState({});

  useEffect(() => {
    plantService.getPlantByID(id).then(
      (response) => {
        let data = response.data?.data;
        if (data) {
          let nutritionTarget = {};
          data.nutrition_targets.forEach(target => {
            nutritionTarget[target.plant_age] = Math.floor(target?.target_ppm);
          });
          setTarget(nutritionTarget);
          setPlant(data);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }, [id]);

  const handleSubmit = (formValue) => {
    let data = plant;
    data.nutrition_targets.forEach((target, i) => {
      let result = formValue[target.plant_age];
      if (result) {
        data.nutrition_targets[i].target_ppm = result;
      }
    });
    setPlant(data);
    setLoading(true);
    plantService.updatePlant(data).then(
      (response) => {
        setLoading(false);
        toast.success("nutrition target has been successfully updated");
        navigate("/plants")
      }).catch(
        (error) => {
          toast.error("error: " + error.response.error.message);
          setLoading(false);
        }
      );
  };

  const renderTargetPerDays = (errors, touched) => {
    let rows = [];
    for (let i = plant?.plant_age; i <= plant?.harvest_age; i++) {
      let columns = [];
      let maxPoint = i + 4;
      while (i < maxPoint && i <= plant?.harvest_age) {
        columns.push(<td key={i}>Day {i}</td>);
        columns.push(<td key={i + "-value"}><Field
          className={errors[i] && touched[i] ? "form-control  is-invalid" : "form-control"}
          type="number"
          id={"id" + i}
          name={i}
          required={true}
          disabled={i < plant.current_age}
        /></td>);
        i++;
      }

      rows.push(<tr key={i}>
        {columns}
      </tr>);
    }

    return rows;
  }

  return (
    <div className="card mb-4">
      <h5 className="card-header">Update Nutrition Target</h5>
      <hr className="my-0" />
      <div className="card-body">
        <Formik
          className="mb-3"
          initialValues={target}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <tbody className="table-border-bottom-0">
                      {renderTargetPerDays(errors, touched)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-2">
                <button type="submit" className="btn btn-primary me-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Save changes
                </button>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePlantNutritionTarget;
