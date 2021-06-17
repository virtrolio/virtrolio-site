import { Component } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css'],
})
export class ErrorAlertComponent {
  dismissible = true;
  alerts: any[] = [];

  addImageCountLimit(): void {
    this.alerts.push({
      type: 'danger',
      head: 'Hold On!',
      msg: 'You can only add up to 3 images',
      timeout: 10000,
    });
  }

  addImageSizeLimit(fileName: string): void {
    this.alerts.push({
      type: 'danger',
      head: 'Woah there,',
      msg: `${fileName} is larger than 8 MB in size`,
      timeout: 10000,
    });
  }

  addUnsupportedFileType(fileName: string): void {
    this.alerts.push({
      type: 'danger',
      head: 'Wait, ',
      msg: `${fileName} is not a supported file type. Please only select .png, .jpg, .jpeg, .tif, .tiff, .bmp, .gif, .jfif, .pjp files`,
      timeout: 10000,
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
