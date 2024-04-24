import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  FavouriteMovies: any[] = [];
  // isFavouriteMovie: boolean = false;
  userData = { Username: '', FavouriteMovies: [] };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '400px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '400px'
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: description
      },
      width: '400px'
    });
  }

  getFavouriteMovies(): void {
    this.user = this.fetchApiData.getOneUser();
    // this.userData.FavouriteMovies = this.user.FavouriteMovies;
    this.FavouriteMovies = this.user.FavouriteMovies;
    console.log('Favourite movies of this user', this.FavouriteMovies);
  }

  isFavouriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavouriteMovies.indexOf(movieID) >= 0;
  }

  addFavouriteMovie(movie: string): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavouriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavouriteMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  removeFavouriteMovie(movie: any): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavouriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavouriteMovies();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

}
