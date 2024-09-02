import React, { useEffect, useState } from "react";
import { Formik, Field, Form, getIn } from "formik";
import * as Yup from "yup";
import installationConfigService from "../../services/installation-config.service";
import { toast } from "react-toastify";

const UpdateInstallationConfig = () => {
  const [loading, setLoading] = useState(false);
  const [installationConfig, setInstallationConfig] = useState({
    id: "",
    nutrition_ppm: "",
    raw_water_ppm: "",
    fuzzy_nutrition_water_level_percent: "",
    fuzzy_nutrition_water_volume_high: "",
    fuzzy_nutrition_water_volume_medium: "",
    fuzzy_nutrition_water_volume_low: "",
    fuzzy_water_temperature_percent: "",
    raw_water_container: {
      id: "",
      name: "",
      sensor_gap: "",
      height: "",
      bottom_area: "",
      top_area: "",
      volume: ""
    },
    nutrition_water_container: {
      id: "",
      name: "",
      sensor_gap: "",
      height: "",
      bottom_area: "",
      top_area: "",
      volume: ""
    }
  });




  const getData = () => {
    installationConfigService.getInstallationConfig().then(
      (response) => {
        let data = response.data?.data;
        if (data) {
          setInstallationConfig(data);
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(getData, []);

  const handleSubmit = (formValue) => {
    setLoading(true);
    installationConfigService.updateInstallationConfig(formValue).then(
      (response) => {
        getData();
        setLoading(false);
        toast.success("installation config has been successfully updated");
      }).catch(
        (error) => {
          toast.error("error: " + error.response.error.message);
          setLoading(false);
        }
      );
  };

  const validationSchema = Yup.object().shape({
    id: Yup.number().required().integer(),
    nutrition_ppm: Yup.number().min(0).required(),
    raw_water_ppm: Yup.number().min(0).required(),
    fuzzy_nutrition_water_level_percent: Yup.number().min(0).required(),
    fuzzy_nutrition_water_volume_high: Yup.number().min(0).required(),
    fuzzy_nutrition_water_volume_medium: Yup.number().required().min(0),
    fuzzy_nutrition_water_volume_low: Yup.number().min(0).required(),
    fuzzy_water_temperature_percent: Yup.number().required().min(0),
    raw_water_container: Yup.object().shape({
      id: Yup.string().required(),
      sensor_gap: Yup.number().required().min(0),
      height: Yup.number().required().min(0),
      bottom_area: Yup.number().required().min(0),
      top_area: Yup.number().required().min(0),
    }),
    nutrition_water_container: Yup.object().shape({
      id: Yup.string().required(),
      sensor_gap: Yup.number().required().min(0),
      height: Yup.number().required().min(0),
      bottom_area: Yup.number().required().min(0),
      top_area: Yup.number().required().min(0),
    }),
  });

  return (

    <div className="card mb-4">
      <h5 className="card-header">Installation Config</h5>
      <hr className="m-0" />
      <Formik
        className="mb-3"
        initialValues={installationConfig}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="card-body">
              <small className="text-light fw-medium">Water And Nutrition</small>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="nutrition_ppm" className="form-label">
                    Nutrition PPM
                  </label>
                  <Field
                    className={errors.nutrition_ppm && touched.nutrition_ppm ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="nutrition_ppm"
                    name="nutrition_ppm"
                    autoFocus
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="raw_water_ppm" className="form-label">
                    Raw Water PPM
                  </label>
                  <Field
                    className={errors.raw_water_ppm && touched.raw_water_ppm ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="raw_water_ppm"
                    name="raw_water_ppm"
                  />
                  <div className="invalid-feedback">{errors.raw_water_ppm}</div>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div className="card-body">
              <small className="text-light fw-medium">Fuzzy Config</small>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="fuzzy_nutrition_water_level_percent" className="form-label">
                    Nutrition Water Level Percent
                  </label>
                  <Field
                    className={errors.fuzzy_nutrition_water_level_percent && touched.fuzzy_nutrition_water_level_percent ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="fuzzy_nutrition_water_level_percent"
                    name="fuzzy_nutrition_water_level_percent"
                  />
                  <div className="invalid-feedback">{errors.fuzzy_nutrition_water_level_percent}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="fuzzy_water_temperature_percent" className="form-label">
                    Water Temperature Percent
                  </label>
                  <Field
                    className={errors.fuzzy_water_temperature_percent && touched.fuzzy_water_temperature_percent ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="fuzzy_water_temperature_percent"
                    name="fuzzy_water_temperature_percent"
                  />
                  <div className="invalid-feedback">{errors.fuzzy_water_temperature_percent}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="fuzzy_nutrition_water_volume_high" className="form-label">
                    Nutrition Water Volume High
                  </label>
                  <Field
                    className={errors.fuzzy_nutrition_water_volume_high && touched.fuzzy_nutrition_water_volume_high ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="fuzzy_nutrition_water_volume_high"
                    name="fuzzy_nutrition_water_volume_high"
                  />
                  <div className="invalid-feedback">{errors.fuzzy_nutrition_water_volume_high}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="fuzzy_nutrition_water_volume_medium" className="form-label">
                    Nutrition Water Volume Medium
                  </label>
                  <Field
                    className={errors.fuzzy_nutrition_water_volume_medium && touched.fuzzy_nutrition_water_volume_medium ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="fuzzy_nutrition_water_volume_medium"
                    name="fuzzy_nutrition_water_volume_medium"
                  />
                  <div className="invalid-feedback">{errors.fuzzy_nutrition_water_volume_medium}</div>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="fuzzy_nutrition_water_volume_low" className="form-label">
                    Nutrition Water Volume Low
                  </label>
                  <Field
                    className={errors.fuzzy_nutrition_water_volume_low && touched.fuzzy_nutrition_water_volume_low ? "form-control  is-invalid" : "form-control"}
                    type="number"
                    id="fuzzy_nutrition_water_volume_low"
                    name="fuzzy_nutrition_water_volume_low"
                  />
                  <div className="invalid-feedback">{errors.fuzzy_nutrition_water_volume_low}</div>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div className="card-body">
              <small className="text-light fw-medium">Water Container Config</small>
              <div className="row">
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sensor Gap</th>
                        <th>Height</th>
                        <th>Bottom Area</th>
                        <th>Top Area</th>
                        <th>Volume</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr>
                        <td>{installationConfig.raw_water_container.name}</td>
                        <td><Field
                          className={getIn(touched, 'raw_water_container.sensor_gap') && getIn(errors, 'raw_water_container.sensor_gap') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="raw_water_container.sensor_gap"
                          name="raw_water_container.sensor_gap"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'raw_water_container.sensor_gap')}</div></td>
                        <td><Field
                          className={getIn(touched, 'raw_water_container.height') && getIn(errors, 'raw_water_container.height') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="raw_water_container.height"
                          name="raw_water_container.height"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'raw_water_container.height')}</div></td>
                        <td><Field
                          className={getIn(touched, 'raw_water_container.bottom_area') && getIn(errors, 'raw_water_container.bottom_area') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="raw_water_container.bottom_area"
                          name="raw_water_container.bottom_area"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'raw_water_container.bottom_area')}</div></td>
                        <td><Field
                          className={getIn(touched, 'raw_water_container.top_area') && getIn(errors, 'raw_water_container.top_area') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="raw_water_container.top_area"
                          name="raw_water_container.top_area"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'raw_water_container.top_area')}</div></td>
                        <td>{installationConfig.raw_water_container.volume}</td>
                      </tr>
                      <tr>
                        <td>{installationConfig.nutrition_water_container.name}</td>
                        <td><Field
                          className={getIn(errors, 'nutrition_water_container.sensor_gap') && getIn(touched, 'nutrition_water_container.sensor_gap') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="nutrition_water_container.sensor_gap"
                          name="nutrition_water_container.sensor_gap"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'nutrition_water_container.sensor_gap')}</div></td>
                        <td><Field
                          className={getIn(errors, 'nutrition_water_container.height') && getIn(touched, 'nutrition_water_container.height') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="nutrition_water_container.height"
                          name="nutrition_water_container.height"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'nutrition_water_container.height')}</div></td>
                        <td><Field
                          className={getIn(errors, 'nutrition_water_container.bottom_area') && getIn(touched, 'nutrition_water_container.bottom_area') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="nutrition_water_container.bottom_area"
                          name="nutrition_water_container.bottom_area"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'nutrition_water_container.bottom_area')}</div></td>
                        <td><Field
                          className={getIn(errors, 'nutrition_water_container.top_area') && getIn(touched, 'nutrition_water_container.top_area') ? "form-control  is-invalid" : "form-control"}
                          type="number"
                          id="nutrition_water_container.top_area"
                          name="nutrition_water_container.top_area"
                        />
                          <div className="invalid-feedback">{getIn(errors, 'nutrition_water_container.top_area')}</div></td>
                        <td>{installationConfig.nutrition_water_container.volume}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div className="card-body">
              <div className="row">
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default UpdateInstallationConfig;
