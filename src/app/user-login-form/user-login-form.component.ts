import { UserRegistrationService } from '../fetch-api-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  //  Function responsible for sending the form inputs to the backend
  // Function responsible for sending the form inputs to the backend and handling the response
  loginUser(): void {
    console.log('Login button clicked:', this.loginData.Username);

    this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
      if (response && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.dialogRef.close();
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      } else {
        console.error('Invalid login response:', response);
        this.snackBar.open('Login failed: Incomplete response', 'OK', { duration: 2000 });
      }
    }, (error) => {
      console.error('Login error:', error);
      this.snackBar.open('Login failed: Server error', 'OK', { duration: 2000 });
    });
  }
}

// import { UserRegistrationService } from '../fetch-api-data.service';
// import { Component, OnInit, Input } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-login-form',
//   templateUrl: './user-login-form.component.html',
//   styleUrls: ['./user-login-form.component.scss']
// })
// export class UserLoginFormComponent implements OnInit {

//   @Input() loginData = { Username: '', Password: '' }

//   constructor(
//     public fetchApiData: UserRegistrationService,
//     public dialogRef: MatDialogRef<UserLoginFormComponent>,
//     public snackBar: MatSnackBar,
//     public router: Router
//   ) { }

//   ngOnInit(): void {
//   }

//   //  Function responsible for sending the form inputs to the backend
//   loginUser(): void {
//     //attempt to find out why login dialog is not displayed using console.log (console.log is not displayed either)
//     console.log('Login button clicked');
//     console.log('Username:', this.loginData.Username);
//     console.log('Password:', this.loginData.Password);
//     // this.router.navigate(['movies']);
//     this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
//       // Logic for a successful user login
//       console.log(response);
//       localStorage.setItem('user', JSON.stringify(response.Username));
//       localStorage.setItem('token', response.token);
//       this.dialogRef.close(); // This will close the modal on success!
//       console.log(response);
//       this.snackBar.open('login succesfull', 'OK', {
//         duration: 2000
//       });
//       this.router.navigate(['movies']);
//     }, (response) => {
//       console.log(response);
//       this.snackBar.open('login failed', 'OK', {
//         duration: 2000
//       });
//     });
//   }
// }
