import Component from "./component";

/**
 * placeholder component
 * for plans table when no plan is added yet
 */
export class Placeholder extends Component<
  HTMLTableRowElement,
  HTMLTableCellElement
> {
  constructor() {
    super("placeholder", "table-body", true);
  }

  configure() {}

  renderContent() {}
}
