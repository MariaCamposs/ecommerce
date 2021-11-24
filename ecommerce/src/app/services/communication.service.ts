import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

 // constructor() { }
  disparador = new BehaviorSubject({});
  disparadorObservable = this.disparador.asObservable();

  sendCart(cart: any) {
    this.disparador.next(cart);
  }
}
