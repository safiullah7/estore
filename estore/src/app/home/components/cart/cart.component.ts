import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartStoreItem} from '../../services/cart/cart.storeItem';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RatingsComponent} from '../../../shared/components/ratings/ratings.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {CartItem, DeliveryAddress} from '../../../../types/cart.type';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoggedInUser} from '../../../../types/user.type';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/users/user.service';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-cart',
  imports: [
    FaIconComponent,
    RatingsComponent,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  user: LoggedInUser;
  subscriptions: Subscription = new Subscription();
  protected readonly faTrash = faTrash;
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(
    private router: Router,
    public cartStore: CartStoreItem,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      pin: '',
      address: '',
      state: '',
      city: '',
      email: '',
    };
    this.subscriptions.add(this.userService.loggedInUser$.subscribe(user => {
      if (user.firstName) {
        this.user = user;
      }
    }))
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
      email: [`${this.user.email}`, [Validators.required, Validators.email]],
      address: [`${this.user.address}`, Validators.required],
      city: [`${this.user.city}`, Validators.required],
      state: [`${this.user.state}`, Validators.required],
      pin: [`${this.user.pin}`, Validators.required],
    })
  }
  ngOnDestroy() {
      this.subscriptions.unsubscribe();
  }

  navigateToHome() {
    this.router.navigate(['home/products']);
  }
  removeItem(cartItem: CartItem) {
    this.cartStore.removeProduct(cartItem);
  }
  updateQuantity($event: any, cartItem: CartItem) {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  onSubmit() {
    if (this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        username: this.orderForm.get("name")?.value,
        address: this.orderForm.get("address")?.value,
        city: this.orderForm.get("city")?.value,
        state: this.orderForm.get("state")?.value,
        pin: this.orderForm.get("pin")?.value,
      }
      this.subscriptions.add(this.orderService.saveOrder(deliveryAddress, this.user.email).subscribe({
        next: (result) => {
          this.cartStore.clearCart();
          this.alertType = 0;
          this.alertMessage = 'order registered successfully!';
          this.disableCheckout = true;
        },
        error: err => {
          this.alertType = 2;
          this.alertMessage = err.message;
        }
      }))
    }
  }
}
