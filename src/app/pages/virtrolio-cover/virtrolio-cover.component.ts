import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../core/app-auth.service';
import { LinkGenService } from '../../core/link-gen.service';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: ['./virtrolio-cover.component.css']
})
export class VirtrolioCoverComponent implements OnInit {

  constructor(public authService: AppAuthService, private lgs: LinkGenService) { }

  ngOnInit(): void { }

  copyLink(inputElement, buttonElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);  /* For mobile devices */
    document.execCommand('copy');              /* Copy text */
    buttonElement.innerHTML = 'Copied!';       /* Confirm the copy */
  }

  // ITS LINK GEN TIME
  bar() {
    this.lgs.getLink().then(
      link => console.log(link)
    );
  }

}
