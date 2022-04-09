import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as internal from 'assert';
import { PowerOutlet } from 'src/app/models/power-outlet.model';
import { MqttInterfaceService } from 'src/app/Services/mqtt-interface.service';
import { manualRfControlTopic } from 'src/app/Services/topicKeys';

@Component({
  selector: 'power-outlet',
  templateUrl: './power-outlet.component.html',
  styleUrls: ['./power-outlet.component.scss'],
})
export class PowerOutletComponent implements OnInit {

  @Input() data: PowerOutlet;
  @Input() topicID: string;
  stateToggle: number;
  //@Input() isTest: boolean;

  constructor(private mqttService: MqttInterfaceService, private alertController: AlertController) { }

  ngOnInit() {
    this.stateToggle = 0;


  }

  onToggleClick() {
  
    //this.mqttService.subscribeToTopic();

    let outletObj = {
      [this.data.id]: !this.data.currentValue 
    }

    let outletJsonString = JSON.stringify(outletObj);
    
    this.mqttService.publishMessage(manualRfControlTopic + "/" + this.topicID, outletJsonString, 1, false).catch((error) => {
      console.log(error);
      this.presentPowerOutletToggleError(this.data.currentValue, this.data.name);
      this.data.currentValue = !this.data.currentValue; 
    });

    if (this.stateToggle == 0){
      this.stateToggle = 1;
    }
    else{
      this.stateToggle = 0;
    }
  }

  async presentPowerOutletToggleError(state: boolean, outletName: string) {
    let outletState = 'off';
    if(state) {
      outletState = 'on';
    } 

    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Unable to turn ' + outletState + ' ' + outletName,
      buttons: ['OK']
    });
    await alert.present();
  }
}
