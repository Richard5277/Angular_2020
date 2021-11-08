import { Component } from '@angular/core';
import { MessageService } from '@services/messenger.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: [
    'div { font-weight: normal; background-color: rgb(81 227 193 / 87%); }']
})
export class MessagesComponent {
  constructor(public messageService: MessageService){}
}
