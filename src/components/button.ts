import { OrderState } from "../state/order-state";
import Component from "./component";

/**
 * button add plan component
 */
export class ButtonComponent extends Component<
  HTMLTableCaptionElement,
  HTMLButtonElement
> {
  constructor(destination: string, private orderState: OrderState) {
    super("plans-button", destination, false);
    this.configure();
  }

  configure() {
    /**
     * subscribes to orders data changes
     */
    this.orderState.addListener((orders) => {
      this.element.disabled = orders.every((o) => o.status === "DELIVERED"); // disables the 'ADD PLAN' button when all orders are delivered
    });
  }

  renderContent() {}
}
