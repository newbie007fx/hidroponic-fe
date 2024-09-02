import BaseApiService from "./base-api.service";

const singleton = Symbol();

class DeviceStateService extends BaseApiService {
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new DeviceStateService();
        }

        return this[singleton];
    }

    getDeviceState = () => {
        return this.get(`/v1/device-states`);
    }
}

export default DeviceStateService.instance;
