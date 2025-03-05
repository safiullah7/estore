import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {matchPasswords} from './match-passwords.validator';
import {UserService} from '../../../services/users/user.service';
import {User} from '../../../../../types/user.type';

@Component({
  selector: 'app-user-signup',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;
  protected alertMessage: string = '';
  protected alertType: number;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userSignupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        city: [''],
        state: [''],
        address: [''],
        pin: ['']
      },
      {
        validator: matchPasswords
      }
    );
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }
  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSumbit() {
    const user: User = {
      email: this.email?.value,
      password: this.password?.value,
      firstName: this.firstName?.value,
      address: this.userSignupForm.get("address")?.value,
      city: this.userSignupForm.get("city")?.value,
      pin: this.userSignupForm.get("pin")?.value,
      state: this.userSignupForm.get("state")?.value,
      lastName: this.userSignupForm.get("lastName")?.value,
    };

    this.userService.createUser(user).subscribe({
      next: (result) => {
        if (result.message === 'success') {
          this.alertMessage = 'User successfully created';
          this.alertType = 0;
        } else if (result.message === 'email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: err => {
        this.alertMessage = err.message;
        this.alertType = 2;
      }
    })
  }
}
