import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProductService } from 'src/app/products/product.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean;
  isAdmin: boolean = true;
  public searchText!: string;
  loginUser;
  cartCount: number = 0;
  urlStatus: boolean;
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartserviceService
  ) {}

  ngOnInit(): void {
    this.userDataService.login.subscribe((data) => {
      this.isUserLoggedIn = data;
    });

    this.userDataService.isAdmin.subscribe((data) => {
      this.isAdmin = data;
      console.log(`ìs admin : ${this.isAdmin}`);
    });

    this.userDataService.url.subscribe((data) => {
      this.urlStatus = data;
    });

    this.cartService.cartCount.subscribe((res) => {
      this.addToCart();
      console.log(res);
    });

    this.cartService.cartCountMinus.subscribe((res) => {
      this.addToCart();
    });
  }
  onLogOut() {
    localStorage.removeItem('user');
    this.userDataService.login.next(false);
    this.router.navigate(['/home']);
  }

  search(data: any) {
    this.searchText = (data.target as HTMLInputElement).value;
    this.productService.search.next(this.searchText);
  }

  addToCart() {
    this.cartService.getCarts().subscribe((cartData) => {
      let newCartCount = 0;
      cartData.forEach((cartElement) => {
        if (cartElement.userId == JSON.parse(localStorage.getItem('user')).id) {
          console.log(cartData.length);
          newCartCount++;
        }
      });
      this.cartCount = newCartCount;
    });
  }
}
