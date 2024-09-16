import BaseApiService from "./base-api.service";

const singleton = Symbol();

class PlantService extends BaseApiService {
  static get instance() {
    if (!this[singleton]) {
        this[singleton] = new PlantService();
    }

    return this[singleton];
}

  getActivePlant = () => {
    return this.get("/v1/plants/active");
  }

  getPlantByID = (id) => {
    return this.get(`/v1/plants/${id}`);
  }

  getAllPlant = () => {
    return this.get("/v1/plants");
  }

  createPlant = (data) => {
    return this.post("/v1/plants", data);
  }

  updatePlant = (data) => {
    return this.put("/v1/plants", data);
  }

  updatePlantStatus = (data) => {
    return this.put("/v1/plants/status", data);
  }

  updatePlantGrowth = (id) => {
    return this.put("/v1/plants/"+id+"/growth");
  }

  harvestPlant = (data) => {
    return this.put("/v1/plants/harvest", data);
  }

  deletePlant = (id) => {
    return this.delete(`/v1/plants/${id}`);
  }
}

export default PlantService.instance;
