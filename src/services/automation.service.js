import BaseApiService from "./base-api.service";

const singleton = Symbol();

class AutomationService extends BaseApiService {
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new AutomationService();
        }

        return this[singleton];
    }

    getAutomationByID = (id) => {
        return this.get(`/v1/automations/${id}`);
    }

    getAllAutomation = (params) => {
        return this.get("/v1/automations", params);
    }
}

export default AutomationService.instance;
