import {StoreItem} from '../../../shared/storeItem';
import {Cart, CartItem} from '../../../../types/cart.type';
import {Observable} from 'rxjs';
import {Product} from '../../../../types/product.type';

export class CartStoreItem extends StoreItem<Cart> {
  constructor() {
    let storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      super(JSON.parse(storedCart))
    } else {
      super({
        products: [],
        totalAmount: 0,
        totalProducts: 0,
      });
    }
  }
  get cart$(): Observable<Cart> {
    return this.value$;
  }
  get cart(): Cart {
    return this.value;
  }
  addProduct(product: Product): void {
    let cartProduct = this.cart.products.find(p => p.product.id === product.id);
    if (!cartProduct) {
      this.cart.products = [
        ...this.cart.products,
        {
          product: product,
          amount: Number(product.price),
          quantity: 1
        }
      ];
    } else {
      cartProduct.quantity++;
      cartProduct.amount += Number(product.price);
    }
    this.cart.totalAmount += Number(product.price);
    this.cart.totalProducts++;
    this.saveCart();
  }

  removeProduct(cartItem: CartItem) {
    this.cart.products = this.cart.products.filter(p => p.product.id !== cartItem.product.id);
    this.cart.totalProducts -= cartItem.quantity;
    this.cart.totalAmount -= cartItem.amount;

    if (this.cart.totalProducts === 0) {
      sessionStorage.clear();
    } else {
      this.saveCart();
    }
  }

  decreaseProductQuantity(cartItem: CartItem) {
    let cartProduct = this.cart.products.find(p => p.product.id === cartItem.product.id);

    if (cartProduct) {
      if (cartProduct.quantity === 1) {
        this.removeProduct(cartItem);
      } else {
        cartProduct.quantity--;
        this.cart.totalAmount -= cartProduct.product.price;
        --this.cart.totalProducts;
      }
    }

    this.saveCart();
  }

  saveCart() {
    sessionStorage.clear();
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
