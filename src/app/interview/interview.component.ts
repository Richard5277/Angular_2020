import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.sass']
})
export class InterviewComponent implements OnInit {

  countInsideInterview$: Observable<number>;

  firstname = '';
  lastname = '';
  userName = '';
  endNumber;
  showUnlessDirective = false;
  switchValue = 10;
  styles = {
    mainBorder: 'purple',
    mainBackgroundColor : '#FEC0AA',
    mainWidth: '200px'
  };



  toggleUnlessDirective(){
    this.showUnlessDirective = !this.showUnlessDirective;
  }

  constructor(private store: Store<{count: number}>) {
    this.countInsideInterview$ = store.pipe(select('count'));
  }

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
