export class Order {
 public timestamp: Date;
 public order_quantity: Number;
 public trade_type: String;
 public symbol: String;
 public bid_price: Number;

 deserialize(input: any): this {
     return Object.assign(this, input);
 }
}