import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Category } from '../category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoryList: Category;
  isUserLoggedIn: boolean;
  urlStatus: boolean;
  constructor(
    private productService: ProductService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });

    this.userDataService.login.subscribe((data) => {
      this.isUserLoggedIn = data;
    });

    this.userDataService.url.subscribe((data) => {
      this.urlStatus = data;
    });

    console.log(`Login status on Sidebar : ${this.isUserLoggedIn}`);
  }
}
