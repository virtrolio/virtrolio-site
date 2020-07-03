import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: [ './single-message.component.css' ]
})
export class SingleMessageComponent implements OnInit {
  currentMessageId: string;

  constructor(public viewService: ViewingService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
              private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.currentMessageId = params.messageId;
    });
    if (this.route.snapshot.queryParams.showBookmarkAlert) {
      this.toastr.info('You can now bookmark this page to view this message later', 'Bookmark',
        { positionClass: 'toast-bottom-full-width' });
      this.location.go('/viewing', '?messageId=' + this.currentMessageId );
    }
  }

  ngOnInit(): void {
    this.viewService.getMessageById(this.currentMessageId);
  }

  /**
   * Go to 'all messages' view
   */
  goToMessages() {
    this.router.navigate([ '/viewing' ]).then(() => {
      window.location.reload();
    });
  }
}
