import BaseApiService from "./base-api.service";

const singleton = Symbol();

class InstallationConfigService extends BaseApiService {
  static get instance() {
    if (!this[singleton]) {
        this[singleton] = new InstallationConfigService();
    }

    return this[singleton];
}

  getInstallationConfig = () => {
    return this.get("/v1/installation-configs");
  }

  updateInstallationConfig = (data) => {
    return this.put("/v1/installation-configs", data);
  }
}

export default InstallationConfigService.instance;
