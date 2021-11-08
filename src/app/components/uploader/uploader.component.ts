import { Component, OnInit } from '@angular/core';
import { MessageService } from '@services/messenger.service';
import { UploaderService } from '@services/uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styles: [
    'input[type=file] { font-size: 1.2rem }',
    'h2 { color: blue; font-size: 1.6rem }',
    'p { background-color: yellow; color: black, width: 120px; height: 18px; line-height: 12px; }'
  ],
  providers:  [UploaderService]
})
export class UploaderComponent implements OnInit{
  message = '';
  logs: string[] = [];

  constructor(
    private uploadService: UploaderService,
    private messages: MessageService
  ){}

  ngOnInit(){
    this.logs = this.messages.messages;
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      this.uploadService.upload(file).subscribe(
        // subscribe only capture the final response data ?
        msg => {
          console.log('✅ : ', msg);
          input.value = '';
          this.message = msg;
        }
      );
    }
  }

}
