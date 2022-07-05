import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MqttInterfaceService } from '../Services/mqtt-interface.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  title: String;
  unOpened: number;
  correct = true;
  onNotification;
  constructor(private router: Router, public mqttService: MqttInterfaceService) { }

  ngOnInit() { //initial name
    let tempRoute = this.router.url.substr(11);
    if(tempRoute.indexOf('?') !== -1){ //if has query params, cut them out
      tempRoute = tempRoute.substr(0,tempRoute.indexOf('?'));
    }
    this.title = tempRoute[0].toUpperCase() + tempRoute.substr(1);
    this.onNotification = false;
  }

  navigateToTab(tabName : string){
    this.router.navigate(['/dashboard/'+tabName], { queryParamsHandling: "preserve" });
    this.title = tabName[0].toUpperCase() + tabName.substr(1); // capitalize this
    if(tabName == 'notifications'){
    this.onNotification = true;
    console.log(this.onNotification);
    }
    console.log(this.onNotification);
  }


addItem(newItem: number) {
  this.unOpened = newItem;
  console.log(newItem);
  
}
}
   

  

