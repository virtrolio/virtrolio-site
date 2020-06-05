import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})

export class SigningComponent implements OnInit {

  sync(signbox, syncbox) {
    syncbox.value = signbox.value;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
