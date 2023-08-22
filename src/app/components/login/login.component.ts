// src/app/signup/login.component.ts
import {Component, ViewChild} from '@angular/core';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms'; // Import NgForm
import { trigger, state, style } from '@angular/animations';
import { SnackbarService } from '../../services/helper/snackbar'


@Component({
  selector: 'app-signup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('myAnimation', [
      state('done', style({ opacity: 1 })),
      // ... other animation states and transitions ...
    ])
  ]
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!: NgForm;

  userData = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router, private snackBarService: SnackbarService) {}
  loginFormSubmitted = false;

  login() {
    this.loginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.userData).subscribe(
      (response: any) => {
        // Store token in localStorage (as shown in previous responses)
        localStorage.setItem('authToken', response.token);

        // Navigate to the dashboard page
        this.router.navigate(['/dashboard'])
        // Handle successful login, e.g., show a success message or navigate to a different page
      },
      (error: any) => {
        this.snackBarService.showSnackbar(error.error.msg);
      }
    );
  }
}
