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
    'dabeer.jpg',
    'dabeer-silly.png',
    'arvind.jpg',
    'arvind-silly.jpg',
    'eric.jpg',
    'eric-silly.png',
    'tommy.jpg',
    'tommy-silly.jpg',
    'janakitti.png',
    'janakitti-silly.png',
    'john.png',
    'john-silly.png',
    'anthony.png',
    'anthony-silly.png',
    'ajit.png',
    'ajit-silly.png'
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
