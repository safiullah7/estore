import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../services/users/user.service';
import {CommonModule, Location} from '@angular/common';
import {UserLogin, UserToken} from '../../../../../types/user.type';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup;
  protected alertMessage: string = '';
  protected alertType: number;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location,
  ) {}
  ngOnInit() {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit() {
    const user: UserLogin = {
      email: this.email?.value,
      password: this.password?.value,
    }
    this.userService.login(user).subscribe({
      next: (userToken: UserToken) => {
        this.userService.activateToken(userToken);
        this.alertType = 0;
        this.alertMessage = 'Login successful!';

        setTimeout(() => { this.location.back() }, 1000)
      },
      error: (err) => {
        this.alertType = 2;
        this.alertMessage = err.message;
      }
    })
  }
}
