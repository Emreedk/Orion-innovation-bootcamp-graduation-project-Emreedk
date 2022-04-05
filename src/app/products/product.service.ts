import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, Subject } from 'rxjs';
import { Category } from '../site-layout/category';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public search = new BehaviorSubject<string>('');
  viewStatus = new BehaviorSubject<boolean>(true);
  delete = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  createProduct(productBody): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products';
    return this.httpClient.post<Product>(baseUrl, productBody);
  }

  // AllProduct() {
  //   const baseUrl = 'http://localhost:3000/products/';
  //   return this.httpClient.get<Product>(baseUrl).pipe(
  //     map((response) => {
  //       const newArray = [];
  //       for (let key in response) {
  //         if (response.hasOwnProperty(key)) {
  //           newArray.push(response[key]);
  //         }
  //       }
  //       return newArray;
  //     })
  //   );
  // }

  viewProduct(productId): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productId;
    return this.httpClient.get<Product>(baseUrl);
  }
  viewAllProduct(): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/';
    return this.httpClient.get<Product>(baseUrl);
  }
  updateProduct(productID, productBody): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productID;
    return this.httpClient.put<Product>(baseUrl, productBody);
  }
  deleteProduct(productID): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productID;
    return this.httpClient.delete<Product>(baseUrl);
  }

  searchCategoryProduct(categoryID): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products?categoryId=' + categoryID;
    return this.httpClient.get<Product>(baseUrl);
  }
  getCategory() {
    const categoryUrl = 'http://localhost:3000/categories';
    return this.httpClient.get<Category>(categoryUrl);
  }
}
