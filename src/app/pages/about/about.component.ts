import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { strict } from 'assert';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [ './about.component.css' ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  private imagePaths = [
    'arvind.jpg',
    'arvind-silly.jpg',
    'dabeer.jpg',
    'dabeer-silly.png',
    'eric.jpg',
    'eric-silly.png',
    'tommy.jpg',
    'tommy-silly.jpg',
    'janakitti.png',
    'janakitti-silly.png',
    'john.jpg',
    'john-silly.jpg',
  ];

  changePhotoSilly(personNumber) {
    console.log(this.imagePaths[personNumber * 2 + 1]);
    document.getElementById('team-image-' + personNumber.toString()).setAttribute('src', './../../../assets/images/about-us-developers/' +
      this.imagePaths[personNumber * 2 + 1]);
  }
  changePhotoRegular(personNumber) {
    document.getElementById('team-image-' + personNumber.toString()).setAttribute('src', './../../../assets/images/about-us-developers/' +
      this.imagePaths[personNumber * 2]);
  }

  ngOnInit(): void { }
}
