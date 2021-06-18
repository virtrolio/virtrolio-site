import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FAQSection } from '../../shared/interfaces/faq';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  public faqContent: FAQSection[];

  constructor(private title: Title, private commonService: CommonService) {
    this.commonService
      .parseYAMLFromFile('./assets/data/faq.content.yml')
      .then((data) => (this.faqContent = data));
  }

  ngOnInit(): void {
    this.title.setTitle('Frequently Asked Questions | Virtrolio');
  }
}
