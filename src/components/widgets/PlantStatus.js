import plantHelper from "../../helpers/plant";
import { useSelector } from "react-redux";

const PlantStatus = ({activePlant}) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className="card">
      <div className="d-flex align-items-end row">
        <div className="col-sm-7">
          <div className="card-body">
            <h5 className="card-title text-primary">
              Hello {currentUser.user.name},{" "}
              {activePlant !== null
                ? `you have an active plant with name ${activePlant.name} ${activePlant.varieties}.`
                : "you do not have any active plant yet."}
            </h5>
            {activePlant != null ? (
              <div>
                <p className="mb-4">
                  Your plant age is{" "}
                  {plantHelper.calculateAge(activePlant.actived_at, activePlant.plant_age)}{" "}
                  Days, the estimation of harvest date is at{" "}
                  {plantHelper.calculateHarvestDate(
                    activePlant.actived_at,
                    activePlant.plant_age,
                    activePlant.harvest_age
                  )}
                </p>

                <a href="#/" className="btn btn-sm btn-outline-primary">
                  View Plant Detail
                </a>
              </div>
            ) : (
              <div>
                <p className="mb-4">
                  Go to Plants page to add and activate plant.
                </p>

                <a href="#/" className="btn btn-sm btn-outline-primary">
                  View Plants Page
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-5 text-center text-sm-left">
          <div className="card-body pb-0 px-0 px-md-4">
            <img
              src="../assets/img/illustrations/man-with-laptop-light.png"
              height="140"
              alt="View Badge User"
              data-app-dark-img="illustrations/man-with-laptop-dark.png"
              data-app-light-img="illustrations/man-with-laptop-light.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantStatus;
