import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

/**
 * About component, with a short blurb at the top and a row for each contributor.
 */
export class AboutComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void { }

  /**
   * Replace regular photo with silly version.
   * @param personNumber - id number of person (related to id's used in the HTML)
   */
  changePhotoSilly(personNumber: number) {
    console.log(this.imagePaths[personNumber * 2 + 1]);
    document.getElementById('team-image-' + personNumber.toString())
      .setAttribute('src', './../../../assets/images/about-us-developers/' +
        this.imagePaths[personNumber * 2 + 1]);
  }

  /**
   * Replace regular photo with silly version.
   * @param personNumber - id number of person (related to id's used in the HTML)
   */
  changePhotoRegular(personNumber: number) {
    document.getElementById('team-image-' + personNumber.toString())
      .setAttribute('src', './../../../assets/images/about-us-developers/' +
        this.imagePaths[personNumber * 2]);
  }

}
