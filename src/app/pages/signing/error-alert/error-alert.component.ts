import { Component } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent {
  dismissible = true;
  alerts: any[] = [];
 
  addImageCountLimit(): void {
    this.alerts.push({
      type: 'danger',
      head: 'Hold On!',
      msg: 'You can only add up to 3 images',
      timeout: 10000
    });
  }

  addImageSizeLimit(fileName: String): void {
    this.alerts.push({
      type: 'danger',
      head: 'Woah there,',
      msg: `${fileName} is larger than 8 MB in size`,
      timeout: 10000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}