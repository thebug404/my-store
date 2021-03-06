import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from 'src/app/core/services/orders/order.service';

import { Store as NgrxStore } from "@ngrx/store";
import { Store } from "src/app/core/store/index";

import { StartOrderList } from 'src/app/core/store/orders/order.actions';
import { selectAllOrders } from 'src/app/core/store/orders/order.selectors';

import { OrderStickerComponent } from 'src/app/core/components/order-sticker/order-sticker.component';

@Component({
  selector: 'app-orderlist-page',
  templateUrl: './orderlist-page.component.html',
  styleUrls: ['./orderlist-page.component.css']
})
export class OrderlistPageComponent extends OrderStickerComponent implements OnInit {
  orders$!: Observable<Array<Order>>;

  constructor(private store: NgrxStore<Store>) {
    super();
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(selectAllOrders);
    this.store.dispatch(StartOrderList({
      params: { _expand: ["products", "clients"] }
    }));
  }
}
