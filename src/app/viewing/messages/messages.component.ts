import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  userMsgData = [{  'author': 'Rammy',
                    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    'fontfamily': 'montserrat',
                    'fontstyle': 'regular',
                    'fontcolor': 'white',
                    'bgcolor': 'blue'},
                  { 'author': 'Alice',
                    'message': 'Have a good summer',
                    'fontfamily': 'courierNew',
                    'fontstyle': 'bold',
                    'fontcolor': 'white',
                    'bgcolor': 'salmon'},
                  { 'author': 'Bob',
                    'message': 'Goodbye',
                    'fontfamily': 'Montserrat',
                    'fontstyle': 'italic',
                    'fontcolor': 'pink',
                    'bgcolor': 'blue'}];
  constructor() { }

  ngOnInit(): void {
  }

}
