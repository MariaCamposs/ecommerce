export interface ICartModel {
  cart?: Array<CartModel>;
}

export interface CartModel {
  id?: number
  userId?: number,
  date?: string,
  products: CartProductModel
}
export interface CartProductModel {
  productId?: number,
  quantity?: number
}