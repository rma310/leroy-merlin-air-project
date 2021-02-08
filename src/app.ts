import { Header } from "./components/header";
import { Layout } from "./components/layout";
import { TableComponent } from "./components/table";
import { OrderState, orderState } from "./state/order-state";
import { StockState, stockState } from "./state/stock-state";
import { DroneState, droneState } from "./state/drone-state";
import { Stock } from "./models/model";
import { Order } from "./models/order";
import { Drone } from "./models/drone";
import { TablePlansComponent } from "./components/table-plans";
import { NotificationHandler } from "./components/notification";

/**
 * app root
 * creates instances of components
 */

new Header();

new Layout();

new NotificationHandler();

new TablePlansComponent("base-table", "plans", [
  "drones",
  "stores",
  "products",
  "customers",
]);

new TableComponent<Order, OrderState>(
  "base-table",
  "orders",
  ["#", "customers", "products"],
  orderState
);

new TableComponent<Stock, StockState>(
  "base-table",
  "stocks",
  ["products", "villeneuve", "roncq", "lesquin"],
  stockState
);

new TableComponent<Drone, DroneState>(
  "base-table",
  "drones",
  ["drones", "autonomy", "x", "y"],
  droneState
);
