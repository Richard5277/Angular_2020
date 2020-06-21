import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  defaultSlect = 'pet';
  answer = '';
  defaultGender = 'male';
  genders = ['male', 'female'];
  suggestedName = 'Lisa';

  user = {
    name: ''
  };

  // { static: true } => query results available in ngOnInit
  // { static: false } => query results available in ngAfterViewInit
  @ViewChild('f', { static: false }) myForm: NgForm;
  @ViewChild('username', { static: false }) userNameInput: NgModel;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    /* Subscribe input value change, if any additional query needs to be done when user type, eg: real-time suggestions

      this.myForm.controls.questionAnswer.valueChanges.subscribe((value) => {
        console.log(value);
      });

    */

  }

  ngOnChanges() {
    console.log('=> ', this.myForm.valid);
  }

  onSuggestName() {
    // instead of setting whole data package, patch one specific group or control
    this.myForm.form.patchValue({
      richdata: {
        username: this.suggestedName
      }
    });

    /* Set form data

      this.myForm.setValue({
        richdata: {
        username: this.suggestedName,
        email: ''
        },
        secret: 'pet',
        questionAnswer: 'my pleasure',
        gender: this.defaultGender
      });

    */

  }

  onSubmit(form: NgForm) {
    /* Access form data

      this.myForm.form.value

      this.userNameInput.value

    */

    this.user.name = this.myForm.form.value.richdata.username;
    this.myForm.reset();
  }

  ngOnDestroy() {
    /* destroy any subscriptions to prevent memory leak */
  }

}
