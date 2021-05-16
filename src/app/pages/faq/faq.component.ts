import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import faqContent from './faq.content.json';
import { FAQSection } from '../../shared/interfaces/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: [ './faq.component.css' ]
})
export class FaqComponent implements OnInit {
  public faqContent: FAQSection[] = faqContent;

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Frequently Asked Questions | Virtrolio');
  }

}
