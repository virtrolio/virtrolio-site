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

// team_1_silly() {
//   console.log('Dabeer enter');

//   document.getElementById('team-image-1').setAttribute('src', './../../../assets/images/about-us-developers/dabeer-silly.png');

// }

// team_1_regular() {
//   console.log('Dabeer exit');
//   document.getElementById('team-image-1').setAttribute('src', './../../../assets/images/about-us-developers/dabeer.jpg');

// }

// team_2_silly() {
//   document.getElementById('team-image-2').setAttribute('src', './../../../assets/images/about-us-developers/arvind-silly.jpg');
// }

// team_2_regular() {
//   document.getElementById('team-image-2').setAttribute('src', './../../../assets/images/about-us-developers/arvind.jpg');
// }

// team_3_silly() {
//   document.getElementById('team-image-3').setAttribute('src', './../../../assets/images/about-us-developers/eric-silly.png');
// }

// team_3_regular() {
//   document.getElementById('team-image-3').setAttribute('src', './../../../assets/images/about-us-developers/eric.jpg');
// }

// team_4_silly() {
//   document.getElementById('team-image-4').setAttribute('src', './../../../assets/images/about-us-developers/tommy-silly.jpg');
// }

// team_4_regular() {
//   document.getElementById('team-image-4').setAttribute('src', './../../../assets/images/about-us-developers/tommy.jpg');
// }