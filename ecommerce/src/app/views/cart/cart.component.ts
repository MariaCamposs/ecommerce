import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Router } from '@angular/router';
import { faArrowLeft, faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  products: any[] = [];
  base: number = 1;
  total: number = 0;
  myModal = false;

  constructor(private communication: CommunicationService, private router: Router) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getTotal();
  }

  getProducts(){
    const objProduct = JSON.parse(localStorage.getItem('cart') || '{}');
    console.log(objProduct);
    this.products = objProduct;
  }
/*
  getTotal() {
    this.total = this.products
      .map((item: {id: number, products: { productId: number, title: string, image: string,price: number, quantity: number}}) => item.products.quantity * item.products.price)
      .reduce((acc: any, item: any) => (acc += item), 0);
  }
*/
  changeAmount(base: number, item: any) {
    if (item.products.quantity + base < 1) {
      item.products.quantity === 1;
    } else {
      item.products.quantity += base;
    }
    this.getTotal();
  }

  deleteOrder(id: string) {
    this.products = this.products.filter((product: { id: string; }) => product.id !== id)
    this.getTotal();
  }

  modal() {
    this.myModal = !this.myModal
  }

  closeModal(e: boolean) {
    this.myModal = e;
  }
  changeView() {
    this.router.navigate(['home']);
  }

  decreaseOneItem(item: any) {
    this.products = this.products.map((el) => {
      if (el.id === item.id && el.products.quantity > 1) {
        el.products.quantity--
      }
      return el
    })
    this.getTotal()
  }
  increaseOneItem(item: any) {
    this.products = this.products.map((el) => {
      if (el.id === item.id) {
        el.products.quantity++
      } else if (el.id === item.id && el.products.quantity <= 1) {
        let index = this.products.indexOf(item)
        this.products.splice(index, 1)
      }
      return el
    })
    this.getTotal()
  }
  deleteItem(item: any) {
    let index = this.products.indexOf(item)
    this.products.splice(index, 1)
    this.getTotal()
  }

  getTotal() {
    this.total = this.products
      .map(item => item.products.quantity * item.products.price)
      .reduce((acc, item) => acc += item, 0)
  }

  faArrowLeft = faArrowLeft;
  faMinus = faMinus;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
}
