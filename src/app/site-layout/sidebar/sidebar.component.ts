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
    private userDataService: UserDataService,
    private router: Router
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

    // if (!localStorage.getItem('user')) {
    //   this.userDataService.login.subscribe((status) => {
    //     this.isUserLoggedIn = status; //jxJs subject trigger'dan dönen observable'ı aldım.
    //   });
    // } else {
    //   if (localStorage.getItem('user')) {
    //     this.isUserLoggedIn = true;
    //   } else {
    //     this.isUserLoggedIn = null;
    //   }
    // }
  }
}
