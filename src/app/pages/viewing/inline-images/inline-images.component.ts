import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-images',
  templateUrl: './inline-images.component.html',
  styleUrls: ['./inline-images.component.css']
})
export class InlineImagesComponent implements OnInit {
  @Input() imageList: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
