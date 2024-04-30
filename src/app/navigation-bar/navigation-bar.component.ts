import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {

  }

  public launchMovies(): void {
    this.router.navigate(['movies']);
  }

  public launchProfile(): void {
    this.router.navigate(['profile']);
  }

  public logoutUser(): void {
    this.router.navigate(['welcome']);
  }

}
