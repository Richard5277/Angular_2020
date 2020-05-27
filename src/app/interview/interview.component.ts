import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.sass']
})
export class InterviewComponent implements OnInit {

  firstname = '';
  lastname = '';
  userName = '';
  endNumber;
  showUnlessDirective = false;
  switchValue = 10;

  toggleUnlessDirective(){
    this.showUnlessDirective = !this.showUnlessDirective;
  }

  constructor() { }

  ngOnInit(): void {
    const generateButton = document.getElementsByTagName('BUTTON')[0];
    const userNameSpan = document.getElementById('output');
    const firstnameInput = document.getElementById('firstname') as HTMLInputElement;
    const lastnameInput = document.getElementById('lastname') as HTMLInputElement;
    this.endNumber = Math.floor((Math.random() * 9) + 1);

    firstnameInput.addEventListener('keyup', () => {
      this.firstname = firstnameInput.value.toLocaleLowerCase();
      if (this.lastname !== '') {
        userNameSpan.textContent = `${this.firstname}_${this.lastname}_${this.endNumber}`;
      }
    });

    lastnameInput.addEventListener('keyup', () => {
      this.lastname = lastnameInput.value.toLocaleLowerCase();
      if (this.firstname !== '') {
        userNameSpan.textContent = `${this.firstname}_${this.lastname}_${this.endNumber}`;
      }
    });
  }

}
