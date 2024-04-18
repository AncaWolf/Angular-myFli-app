import { UserRegistrationService } from '../fetch-api-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  //  Function responsible for sending the form inputs to the backend
  loginUser(): void {
    //attempt to find out why login dialog is not displayed using console.log (console.log is not displayed either)
    console.log('Login button clicked');
    console.log('Username:', this.loginData.Username);
    console.log('Password:', this.loginData.Password);
    this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
      // Logic for a successful user login
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.Username));
      localStorage.setItem('token', response.token);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('login succesfull', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open('login failed', 'OK', {
        duration: 2000
      });
    });
  }
}
