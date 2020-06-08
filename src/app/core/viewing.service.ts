import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ViewingService {
  userMsgData = [ {
    'authorid': '0',
    'author': 'Rammy',
    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'fontfamily': 'Montserrat',
    'fontstyle': 'regular',
    'fontcolor': '#FFFFFF',
    'bgcolor': '#55d3f2'
  },
    {
      'authorid': '1',
      'author': 'Alice',
      'message': 'Have a good summer',
      'fontfamily': 'Courier New',
      'fontstyle': 'bold',
      'fontcolor': '#FFFFFF',
      'bgcolor': '#ff6b8b'
    },
    {
      'authorid': '2',
      'author': 'Bob',
      'message': 'Goodbye',
      'fontfamily': 'Montserrat',
      'fontstyle': 'italic',
      'fontcolor': '#696969',
      'bgcolor': '#f76534'
    },
    {
      'authorid': '3',
      'author': 'Isabelle',
      'message': 'The Woodlands School was opened in the year 1969. While the first phase of its present building was under construction, The Woodlands operated within Springfield Public School building. In September, 1970, the schools students and staff moved to the new building, and The Woodlands became a combined elementary and secondary school.',
      'fontfamily': 'Times New Roman',
      'fontstyle': 'underline',
      'fontcolor': 'white',
      'bgcolor': '#8a3b12'
    } ];
  isCardView: boolean = false;

  constructor() { }
}
