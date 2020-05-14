import { Component, OnInit } from '@angular/core';
import { Card } from '../shared/models/card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cards: Array<Card> = [
    {
      title: 'Card Component',
      content: ['Material UI Card component', 'Lazy loading with Routes loadChildren function'],
      icon: 'credit_card'
    },
    {
      title: 'Custom Pipe',
      content: ['Build custom pipes with angualr & ramda'],
      icon: 'build',
      detail: 'helloworld'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
