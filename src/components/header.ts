import Component from "./component";

/**
 * header 'Leroy Merlin - Air Project' component
 */
export class Header extends Component<HTMLDivElement, HTMLDivElement> {
  constructor() {
    super("header", "app", true);
  }

  configure() {}

  renderContent() {}
}
