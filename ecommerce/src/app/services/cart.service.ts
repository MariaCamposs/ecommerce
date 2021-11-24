import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel, ICartModel } from '../models/cart-model';
import { IProductDetail } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carts: CartModel[] = []
  private cart = new BehaviorSubject<Array<CartModel>>([]);
  cart$ = this.cart.asObservable();
  publishCart(cart: CartModel){
    this.carts = [...this.carts, cart]
    this.cart.next(this.carts)
  }

  private domain: string;
  private endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.domain = environment.domain;
    this.endpoint = '/carts';
  }

  getCarts(): Observable<CartModel[]> {
    return this.httpClient.get<Array<CartModel>>(`${this.domain}${this.endpoint}`);
  }
  getOneCart(id: string) {
    return this.httpClient.get<CartModel>(`${this.domain}${this.endpoint}/${id}`);
  }
  newCart(body: any) {
    return this.httpClient.post<Array<CartModel>>(`${this.domain}${this.endpoint}`, body);
  }
  deleteCart(uid: string): Observable<CartModel> {
    return this.httpClient.delete<CartModel>(`${this.domain}${this.endpoint}/${uid}`)
  }
}
