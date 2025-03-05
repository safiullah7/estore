import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartStoreItem} from '../cart/cart.storeItem';
import {UserService} from '../users/user.service';
import {CartItem, DeliveryAddress} from '../../../../types/cart.type';
import {Observable} from 'rxjs';
import {Order, OrderItem, PastOrder, PastOrderProduct} from '../../../../types/order.type';
import {Product} from '../../../../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cartStore: CartStoreItem,
    private userService: UserService
  ) { }
  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any> {
    const url = "http://localhost:5011/orders/add";
    const orderdetails: OrderItem[] = [];

    this.cartStore.cart.products.forEach((cartItem: CartItem) => {
      const orderItem: OrderItem = {
        productId: cartItem.product.id,
        qty: cartItem.quantity,
        amount: cartItem.amount,
        price: cartItem.product.price
      };
      orderdetails.push(orderItem);
    });
    const order: Order = {
      userName: deliveryAddress.username,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderdetails,
    };

    return this.http.post(url, order, {
      headers: {authorization: this.userService.token}
    });
  }

  getAllOrders(userEmail: string): Observable<PastOrder[]> {
    const url = "http://localhost:5011/orders/allorders?userEmail=" + userEmail;
    return this.http.get<PastOrder[]>(url, { headers: {authorization: this.userService.token} });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    const url = "http://localhost:5011/orders/orderproducts?orderId=" + orderId;

    return this.http.get<PastOrderProduct[]>(url, { headers: {authorization: this.userService.token} });
  }
}
