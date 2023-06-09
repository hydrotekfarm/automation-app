import { Camera } from './camera.model';
import { Deserializable } from "./deserializable";
import { Device } from "./device.model";
import { EcSensor } from "./ec-sensor.model";
import { GrowlightsSettings } from "./growlights-settings.model";
import { IrrigationSettings } from "./irrigation-settings.model";
import { PhSensor } from "./ph-sensor.model";
import { PowerOutlet } from "./power-outlet.model";
import { ReservoirSettings } from "./reservoir-settings.model";
import { WaterTempSensor } from "./water-temp-sensor.model";


export class FertigationSystem extends Device implements Deserializable {

    settings: {
        ph?: PhSensor,
        ec?: EcSensor,
        water_temp?: WaterTempSensor,
        grow_lights?: GrowlightsSettings,
        irrigation?: IrrigationSettings,
        reservoir?: ReservoirSettings
        air_temp: never,
        humidity: never,
        co2: never
    }

    power_outlets: PowerOutlet[] = [];
    cameras: Camera[] = [];

    deserialize(input: any): this {
        Object.assign(this, input);
        
        if(input.settings.ph !== undefined) {
            this.settings.ph = new PhSensor().deserialize(input.settings.ph);
        }

        if(input.settings.ec !== undefined) {
            this.settings.ec = new EcSensor().deserialize(input.settings.ec);
        }

        if(input.settings.water_temp !== undefined) {
            this.settings.water_temp = new WaterTempSensor().deserialize(input.settings.water_temp);
        }

        if(input.settings.grow_lights !== undefined) {
            this.settings.grow_lights = new GrowlightsSettings().deserialize(input.settings.grow_lights);
        }

        if(input.settings.irrigation !== undefined) {
            this.settings.irrigation = new IrrigationSettings().deserialize(input.settings.irrigation);
        }

        if(input.settings.reservoir !== undefined) {
            this.settings.reservoir = new ReservoirSettings().deserialize(input.settings.reservoir);
        }

        if(input.power_outlets !== undefined) {
            this.power_outlets = [];
            for(let powerOutlet of input.power_outlets) {
                this.power_outlets.push(new PowerOutlet().deserialize(powerOutlet));
            }
        }

        if(input.cameras !== undefined) {
            this.cameras = [];
            for(let camera of input.cameras) {
                this.cameras.push(new Camera().deserialize(camera));
            }
        }
        
        return this;
    }
}
