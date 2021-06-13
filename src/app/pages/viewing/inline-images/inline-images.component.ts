import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-images',
  templateUrl: './inline-images.component.html',
  styleUrls: ['./inline-images.component.css']
})
export class InlineImagesComponent implements OnInit {
  imageList = ['https://bit.ly/3zhRL8v', 'https://bit.ly/3pBm2L7', 'https://bit.ly/3xiaT4d'];

  constructor() { }

  ngOnInit(): void {
  }

}
