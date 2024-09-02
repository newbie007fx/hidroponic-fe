import React, { useState } from "react";
import { PLANT_TYPE_MAP } from "../../constants/plant";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import plantService from "../../services/plant.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePlant = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (formValue) => {
    setLoading(true);

    plantService.createPlant(formValue).then(
      (response) => {
        setLoading(false);
        toast.success("plant has been successfully created");
        navigate("/plants")
      }).catch(
        (error) => {
          toast.error("error: " + error.response.error.message);
          setLoading(false);
        }
      );
  };

  const initialValues = {
    name: "",
    description: "",
    varieties: "",
    plant_type: "",
    harvest_age: "",
    generative_age: "",
    nutrition_min: "",
    nutrition_max: "",
    nutrition_adjustment: "",
    ph_level: "",
    temperature: "",
    plant_age: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    varieties: Yup.string().required(),
    plant_type: Yup.string().required(),
    harvest_age: Yup.number().required().min(0).integer(),
    generative_age: Yup.number().min(0).integer(),
    nutrition_min: Yup.number().required().min(0).integer(),
    nutrition_max: Yup.number().required().min(0).integer(),
    nutrition_adjustment: Yup.number().min(0).integer(),
    ph_level: Yup.number().required().min(0),
    temperature: Yup.number().required().min(0).integer(),
    plant_age: Yup.number().required().min(0).integer(),
  });

  return (
    <div className="card mb-4">
      <h5 className="card-header">Craete Plant</h5>
      <hr className="my-0" />
      <div className="card-body">
        <Formik
          className="mb-3"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    className={errors.name && touched.name ? "form-control  is-invalid" : "form-control"}
                    type="text"
                    id="name"
                    name="name"
                    autoFocus
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Field
                    className={errors.description && touched.description ? "form-control  is-invalid" : "form-control"}
                    type="text"
                    id="description"
                    name="description"
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="varieties" className="form-label">
                    Varieties
                  </label>
                  <Field
                    className={errors.varieties && touched.varieties ? "form-control  is-invalid" : "form-control"}
                    type="text"
                    name="varieties"
                    id="varieties"
                  />
                  <div className="invalid-feedback">{errors.varieties}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="plant_type" className="form-label">
                    Plant Type
                  </label>
                  <Field as="select"
                    id="plant_type"
                    name="plant_type"
                    className={errors.plant_type && touched.plant_type ? "select2 form-control  is-invalid" : "select2 form-control"}>
                    <option key="" value="">Select Plant Type</option>
                    {Object.keys(PLANT_TYPE_MAP).map(function (key) {
                      return <option key={key} value={key}>{PLANT_TYPE_MAP[key]}</option>;
                    })}
                  </Field>
                  <div className="invalid-feedback">{errors.plant_type}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="harvest_age" className="form-label">
                    Harvest Age
                  </label>
                  <Field
                    className={errors.harvest_age && touched.harvest_age ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="harvest_age"
                    name="harvest_age"
                  />
                  <div className="invalid-feedback">{errors.harvest_age}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="generative_age" className="form-label">
                    Generative Age
                  </label>
                  <Field
                    className={errors.generative_age && touched.generative_age ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="generative_age"
                    name="generative_age"
                  />
                  <div className="invalid-feedback">{errors.generative_age}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="nutrition_min" className="form-label">
                    Nutrition Min
                  </label>
                  <Field
                    className={errors.nutrition_min && touched.nutrition_min ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="nutrition_min"
                    name="nutrition_min"
                  />
                  <div className="invalid-feedback">{errors.nutrition_min}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="nutrition_max" className="form-label">
                    Nutrition Max
                  </label>
                  <Field
                    className={errors.nutrition_max && touched.nutrition_max ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="nutrition_max"
                    name="nutrition_max"
                  />
                  <div className="invalid-feedback">{errors.nutrition_max}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="nutrition_adjustment" className="form-label">
                    Nutrition Adjustment
                  </label>
                  <Field
                    className={errors.nutrition_adjustment && touched.nutrition_adjustment ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="nutrition_adjustment"
                    name="nutrition_adjustment"
                  />
                  <div className="invalid-feedback">{errors.nutrition_adjustment}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="ph_level" className="form-label">
                    PH Level
                  </label>
                  <Field
                    className={errors.ph_level && touched.ph_level ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="ph_level"
                    name="ph_level"
                  />
                  <div className="invalid-feedback">{errors.ph_level}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="temperature" className="form-label">
                    Temperature
                  </label>
                  <Field
                    className={errors.temperature && touched.temperature ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="temperature"
                    name="temperature"
                  />
                  <div className="invalid-feedback">{errors.temperature}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="plant_age" className="form-label">
                    Plant Age
                  </label>
                  <Field
                    className={errors.plant_age && touched.plant_age ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="plant_age"
                    name="plant_age"
                  />
                  <div className="invalid-feedback">{errors.plant_age}</div>
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

export default CreatePlant;
