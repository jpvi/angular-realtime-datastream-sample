import { Component, OnInit, SimpleChange, Input } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // state data
  orders: Order[] = new Array();
  symbols(): String[] {
    const filteredOrders: Order[] = this.orders.filter(
      (order, index, self) =>
        index === self.findIndex((o) => o.symbol === order.symbol)
    );

    return filteredOrders.map((o) => o.symbol);
  }

  tradeTypesBySymbol(symbol: String): String[] {
    const tradeTypes: Order[] = this.orders.filter(
      (order, index, self) =>
        index === self.findIndex((o) => o.trade_type === order.trade_type)
    );
    return tradeTypes.map((o) => o.trade_type);
  }

  totalBidsBySymbolAndTradeType(symbol: String, tradeType: String): Number {
    const orders: Order[] = this.orders.filter((o) => o.symbol === symbol && o.trade_type === tradeType);
    return orders.length || 0;
  }

  bidsSumBySymbolAndTradeType(symbol: String, tradeType: String): Number {
    const orders: Order[] = this.orders.filter((o) => o.symbol === symbol && o.trade_type === tradeType);
    const bids: any[] = orders.map((o) => o.bid_price);
    return bids.length === 0 ? 0 : bids.reduce(function (a, b) {
      return (a + b) || 0;
    });
  }

  constructor(private orderSvc: OrderService) {}

  ngOnInit() {
    this.orderSvc.initPubNub();
    this.getOrders();
  }

  getOrders() {
    this.orderSvc.subscribeChannels();
    this.orders = this.orderSvc.getOrders();
  }
}
