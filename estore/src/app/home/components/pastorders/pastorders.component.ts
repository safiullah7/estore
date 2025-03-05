import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/users/user.service';
import {LoggedInUser} from '../../../../types/user.type';
import {PastOrder, PastOrderProduct} from '../../../../types/order.type';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-pastorders',
  imports: [CommonModule],
  templateUrl: './pastorders.component.html',
  styleUrl: './pastorders.component.scss'
})
export class PastordersComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private user: LoggedInUser;
  public pastOrders: PastOrder[] = [];
  public pastOrderProducts: PastOrderProduct[] = [];
  pastOrder: PastOrder;
  constructor(private orderService: OrderService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.subscriptions.add(this.userService.loggedInUser$.subscribe(loggedInUser => {
      if (loggedInUser) {
        this.user = loggedInUser;
        this.orderService.getAllOrders(this.user.email).subscribe(orders => {
          this.pastOrders = orders;
        })
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  selectOrder($event: Event) {
    const selectedOrderId = ($event.target as HTMLSelectElement).value;
    this.pastOrder = this.pastOrders.find(x => x.orderId === +selectedOrderId) ?? <PastOrder>{};
    this.subscriptions.add(this.orderService.getOrderProducts(+(selectedOrderId)).subscribe(products => {
      this.pastOrderProducts = products;
    }))
  }
}
