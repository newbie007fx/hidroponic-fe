import BaseApiService from "./base-api.service";

const singleton = Symbol();

class NutritionWaterLevelService extends BaseApiService {
  static get instance() {
    if (!this[singleton]) {
        this[singleton] = new NutritionWaterLevelService();
    }

    return this[singleton];
}

  getNutritionWaterLevel = () => {
    return this.get("/v1/nutrition-water-levels");
  }
}

export default NutritionWaterLevelService.instance;
