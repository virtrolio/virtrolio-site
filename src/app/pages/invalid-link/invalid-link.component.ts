import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invalid-link',
  templateUrl: './invalid-link.component.html',
  styleUrls: ['./invalid-link.component.css']
})
export class InvalidLinkComponent implements OnInit {
  public signed: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.signed = params['signed'];
    }).unsubscribe();


  }

}
