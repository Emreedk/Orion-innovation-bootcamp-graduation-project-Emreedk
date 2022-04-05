import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private userService: UserDataService) {}

  ngOnInit(): void {
    this.userService.login.next(false);
  }
  onLogin() {
    this.router.navigate(['login']);
    this.userService.login.next(false);
  }
  onRegister() {
    this.router.navigate(['register']);
    this.userService.login.next(false);
  }
}
