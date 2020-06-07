import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})

export class SigningComponent implements OnInit {
  public signingBoxText='';
  
  constructor() { }

  ngOnInit(): void {
  }

}
