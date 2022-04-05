import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  productList: any;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.productService.delete.subscribe((data) => {
      this.getAllProduct();
    });
  }
  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe((deletedData) => {
      this.productService.delete.next(true);
    });
  }

  getAllProduct() {
    this.productService.viewAllProduct().subscribe((data) => {
      this.productList = data;
    });
  }
}
