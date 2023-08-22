// src/app/signup/signup.component.ts
import {Component, ViewChild} from '@angular/core';
import {SignupService} from '../../services/signup/signup.service';
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms'; // Import NgForm
import {trigger, state, style} from '@angular/animations';
import {SnackbarService} from "../../services/helper/snackbar";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('myAnimation', [
      state('done', style({opacity: 1})),
      // ... other animation states and transitions ...
    ])
  ]
})
export class SignupComponent {

  @ViewChild('signupForm') signupForm!: NgForm;

  userData = {
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  constructor(private signupService: SignupService, private router: Router, private snackBar: MatSnackBar,
              private snackBarService: SnackbarService) {
  }

  signupFormSubmitted = false;

  signup() {
    this.signupFormSubmitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    this.signupService.signup(this.userData).subscribe(
      (response: any) => {
        // Store token in localStorage (as shown in previous responses)
        localStorage.setItem('authToken', response.token);

        // Navigate to the dashboard page
        this.router.navigate(['/dashboard'])
        // Handle successful signup, e.g., show a success message or navigate to a different page
      },
      (error: any) => {
        this.snackBarService.showSnackbar(error.error.msg);
      }
    );
  }
}
