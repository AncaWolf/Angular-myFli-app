import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavouriteMovies: [] };

  FavouriteMovies: any[] = [];
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userProfile();
    this.getFavouriteMovies();
  }

  userProfile(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Password = this.user.Password;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavouriteMovies = response.filter((movie: any) => this.user.FavouriteMovies.includes(movie._id));
    });
  }

  updateProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log('Profile Update', response);
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log('User deleted', response);
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }

  getFavouriteMovies(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.FavouriteMovies = this.user.FavouriteMovies;
    this.FavouriteMovies = this.user.FavoriteMovies;
    console.log(`Here is this users ${this.FavouriteMovies}`);
  }

}
