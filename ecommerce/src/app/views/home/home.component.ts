import { Component, OnChanges, OnInit } from '@angular/core';
import { IProductDetail } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';
import { faPlusCircle, faShoppingCart, faCartPlus, faMinus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CommunicationService } from 'src/app/services/communication.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnChanges {

  statusProduct = false
  products: Array<IProductDetail>;
  product!: Object;
  items: any[] = [];
  show: boolean;
  showButton: boolean;
  cart: any[] = [];
  productItem: any[] = [];
  total: number
  base: number = 1;
  constructor(private productService: ProductService, private communication: CommunicationService, private auth: AuthService) {
    this.cart = []
    this.products = []
    this.items = []
    this.show = false;
    this.showButton = false
    this.total = 0
  }

  ngOnInit(): void {
    this.showProducts();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  ngOnChanges(): void {
    this.selectCart();
  }

  showProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.allProducts(response);
        this.filterType('electronics')
      }
    )
  }
  allProducts(product: Array<IProductDetail>) {
    this.products = product;
  }

  filterType(categories: any) {
    this.items = this.products.filter((elem: IProductDetail) => {
      return elem.category === categories;
    })
  }
  addProduct(item: any) {
    let productExist = this.cart.find(cart => item.id === cart.id)
    if(productExist === undefined){
    this.cart.push({
        id: item.id,
        products: {
          productId: item.productId,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: 1
        }
      })
      console.log(this.cart)
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

  }

  decreaseOneItem(item: any) {
    this.productItem = this.items.map((el) => {
      if (el.id === item.id && el.products.quantity > 1) {
        el.products.quantity--
      }
      return el
    })
  }
  increaseOneItem(item: any) {
    this.productItem = this.items.map((el) => {
      if (el.id === item.id) {
        el.products.quantity++
      } else if (el.id === item.id && el.products.quantity <= 1) {
        let index = this.products.indexOf(item)
        this.products.splice(index, 1)
      }
      return el
    })
  }

  changeAmount(base: number, item: any) {
    if (item.products.quantity + base < 1) {
      item.quantity === 1;
    } else {
      item.products.quantity = item.products.quantity + base
    }

  }

  selectCart() {
    this.communication.sendCart(this.cart);
    console.log('enviado')
  }

  changeStatusProduct() {
    this.statusProduct = !this.statusProduct
  }

  deleteItem(id: number) {
    this.cart = this.cart.filter((product: { id: number }) => product.id !== id);
  }

  btnLogOut() {
    this.auth.logout();
  }

  faPlusCircle = faPlusCircle;
  faShoppingCart = faShoppingCart;
  faCartPlus = faCartPlus;
  faMinus = faMinus;
  faPlus = faPlus;
  faSignOutAlt = faSignOutAlt;
/*

  decreaseOneItem(item: CartProductModel) {
    this.productItem = this.productItem.map((el) => {
      if (el.productId === item.productId && el.quantity > 1) {
        el.quantity--
      }
      return el
    })
  }
  increaseOneItem(item: CartProductModel) {
    this.productItem = this.productItem.map((el) => {
      if (el.productId === item.productId) {
        el.quantity++
      } else if (el.productId === item.productId && el.quantity <= 1) {
        let index = this.productItem.indexOf(item)
        this.productItem.splice(index, 1)
      }
      return el
    })
  }
  deleteItem(item: CartProductModel) {
    let index = this.productItem.indexOf(item)
    this.productItem.splice(index, 1)
  }
*/
}
