import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: ['./virtrolio-cover.component.css']
})
export class VirtrolioCoverComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  copyLink(inputElement, buttonElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000); /*For mobile devices*/
    // actually do the copy
    document.execCommand("copy");
    // confirm the copy
    buttonElement.innerHTML = "Copied!";
  }

}
