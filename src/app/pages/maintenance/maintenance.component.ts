import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Under Maintenance - Try again later! | Virtrolio');
  }
}
