import Component from "./component";

/**
 * layout component
 * creates the general flexbox layout
 */
export class Layout extends Component<HTMLDivElement, HTMLDivElement> {
  constructor() {
    super("layout", "app", false);
  }

  configure() {}

  renderContent() {}
}
