import { autobind } from "../decorators/autobind";
import { Drone } from "../models/drone";
import { Plan, Stock } from "../models/model";
import { droneState } from "../state/drone-state";
import { orderState } from "../state/order-state";
import { PlanState, planState } from "../state/plan-state";
import { stockState } from "../state/stock-state";
import { getStoresWithProductAvailable } from "../util/data-service";
import { fly, getPaths } from "../util/journey-service";
import { ButtonComponent } from "./button";
import { TableComponent } from "./table";
import Mock from "../mocks/mock";
import { Store } from "../models/store";
import { Customer } from "../models/customer";
import { Order } from "../models/order";

/**
 * plans table
 * extends the generic table component
 */
export class TablePlansComponent extends TableComponent<Plan, PlanState> {
  private _nextEligibleOrder: Order | undefined;
  private _drones: Drone[];
  private _stocks: Stock[];

  constructor(
    templateId: string,
    protected destination: string,
    protected columnNames: string[]
  ) {
    super(templateId, destination, columnNames, planState);
    this._nextEligibleOrder = orderState.initData.find(
      (o) => o.status === "PENDING"
    );
    this._drones = droneState.initData;
    this._stocks = stockState.initData;
    this.configurePlans();
  }

  configurePlans() {
    new ButtonComponent("table-caption", orderState);

    this.element
      .querySelector("#add-plan")!
      .addEventListener("click", this.eventHandler);

    /**
     * subscribes to orders data changes
     */
    orderState.addListener((orders) => {
      /**
       * resets orders status to PENDING
       * allows to treat deliveries by the queue order
       */
      if (!orders.find((o) => o.status === "PENDING")) {
        orders
          .filter((o) => o.status === "PROCESSING")
          .forEach((o) => orderState.udpateOrderStatus(o, "PENDING"));
      }

      /**
       * makes sure that every pending orders are treated
       * inits customer's deliveries as soon as possible
       */
      this._nextEligibleOrder = orders.find((o) => o.status === "PENDING");
    });

    /**
     * subscribes to drones data changes
     */
    droneState.addListener((drones) => {
      this._drones = drones;
    });
  }

  addPlan() {
    /**
     * gets next product to deliver from order
     */
    const _pq = this._nextEligibleOrder?.basket.find((pq) => pq.quantity > 0);
    if (this._nextEligibleOrder && _pq) {
      const customer = Mock.customers.find(
        (c) => c.id === this._nextEligibleOrder?.customerId
      )!;

      const partialStores: Partial<Store>[] = Mock.stores.map((s) => ({
        id: s.id,
        x: s.x,
        y: s.y,
      }));

      const stores = getStoresWithProductAvailable(
        _pq.productId,
        partialStores,
        this._stocks
      );

      /**
       * gets the shortest path: drone --> store --> client
       * verifies selected drone autonomy
       */
      const shortestPath = getPaths(customer, stores, this._drones).find(
        (s) =>
          s.distance <= this._drones.find((d) => d.id === s.droneId)!.autonomy
      );

      this.generatePlan(
        shortestPath?.droneId!,
        shortestPath?.storeId!,
        _pq.productId,
        customer,
        shortestPath?.distance!
      );

      stockState.removeFromStocks(_pq.productId, 1, shortestPath?.storeId!);

      orderState.updateOrder(this._nextEligibleOrder, _pq);
    }
  }

  generatePlan(
    droneId: string,
    storeId: string,
    productId: string,
    customer: Customer,
    distance: number
  ) {
    this.state.addPlan(new Plan(droneId, storeId, productId, customer.id));
    const drone = this._drones.find((d) => d.id === droneId);

    fly(drone!, distance, productId, customer, this._nextEligibleOrder!);
  }

  @autobind
  private eventHandler(event: Event) {
    event.preventDefault();
    this.addPlan();
  }
}
