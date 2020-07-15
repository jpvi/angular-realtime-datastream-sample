import { Injectable } from "@angular/core";

import { PubNubAngular } from "pubnub-angular2";
import { Order } from "../models/order.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private pubnub: PubNubAngular) {}

  initPubNub() {
    this.pubnub.init({
      publishKey: environment.pubnub.publishKey,
      subscribeKey: environment.pubnub.subscribeKey,
    });
  }

  subscribeChannels() {
    this.pubnub.subscribe({
      channels: environment.pubnub.channels,
      triggerEvents: true,
      withPresence: true,
    });
  }

  getOrders(): Order[] {
    const orders = new Array();
    this.pubnub.getMessage(environment.pubnub.channels[0], (msg) => {
      const message = msg.message;
      const order = new Order();
      order.timestamp = message.timestamp;
      order.order_quantity = message.order_quantity;
      order.trade_type = message.trade_type;
      order.symbol = message.symbol;
      order.bid_price = message.bid_price;
      orders.push(order);
    });
    return orders;
  }

  unsubscribeOrders() {
    this.pubnub.unsubscribe(environment.pubnub.channels[0]);
  }
}
