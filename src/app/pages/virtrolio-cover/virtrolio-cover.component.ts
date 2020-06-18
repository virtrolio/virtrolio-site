import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: [ './virtrolio-cover.component.css' ]
})
export class VirtrolioCoverComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void { }

  copyLink(inputElement, buttonElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);  /* For mobile devices */
    document.execCommand('copy');              /* Copy text */
    buttonElement.innerHTML = 'Copied!';       /* Confirm the copy */
  }

}
