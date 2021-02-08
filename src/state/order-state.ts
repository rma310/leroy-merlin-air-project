import { Order } from "../models/order";
import { State } from "./state";
import Mock from "../mocks/mock";
import { IProductQuantity } from "../models/model";

/**
 * order state
 * manages orders data
 * extends generic state
 */
export class OrderState extends State<Order> {
  private static instance: OrderState;

  private constructor() {
    super(Mock.orders);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new OrderState();
    return this.instance;
  }

  udpateOrderStatus(o: Order, s: "PENDING" | "PROCESSING" | "DELIVERED") {
    o.status = s;
    this.updateListeners();
  }

  updateOrder(o: Order, pq: IProductQuantity) {
    pq.quantity--;
    if(o.basket.every(p => p.quantity === 0)) {
      this.udpateOrderStatus(o, "DELIVERED");  
    } else {
      this.udpateOrderStatus(o, "PROCESSING");
    }
  }
}

export const orderState = OrderState.getInstance();
