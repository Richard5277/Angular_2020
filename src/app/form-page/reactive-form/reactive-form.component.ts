import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  isDisabled = false;
  newServerName = '';
  genders = ['male', 'female'];
  answer = '';
  defaultGender = 'male';
  singupForm: FormGroup;

  forbiddenUserNames = ['Ana', 'Chris'];

  // custom validator
  forbiddenNames = (control: FormControl): { [kye: string]: boolean } => {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  testForbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Rich') {
          resolve({ nameIsAdmin: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // custom async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailInValidate: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  get hobbiesControl() {
    return (this.singupForm.get('hobbies') as FormArray).controls;
  }

  constructor(public logger: LoggerService) {

  }

  ngOnInit(): void {
    this.singupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.testForbiddenNames),
        email: new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails])
      }),
      hobbies: new FormArray([]),
      secret: new FormControl(null, Validators.required),
      questionAnswer: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required)
    });

    /*
      form value variable contains everything ; can be just passed into a update/add funciton directly
      this.singupForm.valueChanges.subscribe((value) => {
       console.log('🦁', value);
      });
    */

    this.singupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }

  onCreateServer = () => {
    this.logger.logImportant('👻', this.newServerName);
  }

  onInput = (event: Event) => {
    const inputEl = event.target as HTMLInputElement;
    console.log('event value => ', inputEl.value);
  }

  onAddHobby = () => {
    const control = new FormControl(null, Validators.required);
    ( this.singupForm.get('hobbies') as FormArray).push(control);
  }

  onDeleteHobby = (i: number) => {
    ( this.singupForm.get('hobbies') as FormArray).removeAt(i);
  }
  clearHobbies() {
    ( this.singupForm.get('hobbies') as FormArray).clear();
  }

  onSubmit() {
    this.singupForm.reset();
  }

}
