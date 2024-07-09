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

  getAllPlant = () => {
    return this.get("/v1/plants");
  }
}

export default PlantService.instance;
