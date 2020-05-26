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
      title: 'Custom Pipe',
      content: ['* Build custom pipes with angualr & ramda'],
      icon: 'build',
      detail: 'helloworld'
    },
    {
      title: 'Material UI',
      content: ['* MatCardModule - Card component', '* Lazy loading with Routes loadChildren function'],
      icon: 'credit_card'
    },
    {
      title: 'Angular Routing',
      content: ['* Deep understanding of modules from \'@angular/router\'', '* Children routes', '* Route quary'],
      icon: 'device_hub'
    },
    {
      title: 'Sass Styling',
      content: ['* Custom theme with sass control', '* Sass variables & mixins', '* Config sass import with webpack'],
      icon: 'style'
    },
    {
      title: 'Angular Life Cycle',
      content: ['* All life cycle methods in Angular application runtime', '* Tic Tac Toe - simple game', '* javascript injection inside Angular'],
      icon: '360'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
