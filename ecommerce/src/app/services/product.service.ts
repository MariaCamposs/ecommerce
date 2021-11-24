import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductDetail } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private domain: string;
  private endpoint: string;
  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
    this.endpoint = '/products';
  }

  getProducts() {
    return this.httpClient.get<IProductDetail>(`${this.domain}${this.endpoint}`);
  }
  getOneProduct(uid: any) {
    return this.httpClient.get<IProductDetail>(`${this.domain}${this.endpoint}/${uid}`);
  }
  getProductsByCategory(categories: any) {
    return this.httpClient.get<IProductDetail>(`${this.domain}${this.endpoint}/${categories}`);
  }
  getOneProductByCategory(categories: any, category: any) {
    return this.httpClient.get<IProductDetail>(`${this.domain}${this.endpoint}/${categories}/${category}`);
  }
}
