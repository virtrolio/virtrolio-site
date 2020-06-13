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

// <div class='row d-flex'>
//             <div class='col-md-2 order-md-2'>
//                 <img src='./../../../assets/images/about-us-developers/anthony.png' class='img-fluid' id='team-image-6' alt='Anthony' (mouseenter)="changePhotoSilly(6)" (mouseleave)="changePhotoRegular(6)">
//             </div>
//             <div class='col-md-7 order-md-3 mt-3 mt-md-0'>
//                 <p>Anthony description</p>
//             </div>
            
//             <div class='col-md-3 order-md-1'>
//                 <p><strong>Contact Anthony:</strong></p>
//                 <ul>
//                     <li>Email: Anthony@gmail.com</li>
//                     <li>Github: Anthony</li>
//                     <li>Instagram: Anthony</li>
//                 </ul>
//             </div>
//         </div>
//         <hr />
//         <div class='row d-flex'>
//             <div class='col-md-2 order-md-2'>
//                 <img src='./../../../assets/images/about-us-developers/ajit.png' class='img-fluid' id='team-image-7' alt='Ajit' (mouseenter)="changePhotoSilly(7)" (mouseleave)="changePhotoRegular(7)">
//             </div>
//             <div class='col-md-7 order-md-1 mt-3 mt-md-0'>
//                 <p>Ajit description</p>
//             </div>
            
//             <div class='col-md-3 order-md-3'>
//                 <p><strong>Contact Ajit:</strong></p>
//                 <ul>
//                     <li>Email: Ajit@gmail.com</li>
//                     <li>Github: Ajit</li>
//                     <li>Instagram: Ajit</li>
//                 </ul>
//             </div>
//         </div>