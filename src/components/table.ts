import Component from "./component";
import { State } from "../state/state";
import { createColumns, populateTable } from "../util/ui-service";

/**
 * generic table component
 */
export class TableComponent<T, U extends State<T>> extends Component<
  HTMLDivElement,
  HTMLDivElement
> {
  protected isInit = true;
  protected data: T[];

  constructor(
    templateId: string,
    protected destination: string,
    protected columnNames: string[],
    protected state: U
  ) {
    super(templateId, destination, false, `${destination}-table`);
    this.data = state.initData;

    this.configure();
    this.renderContent();
  }

  protected configure() {
    /**
     * subscribes to generic data changes
     */
    this.state.addListener((data: T[]) => {
      this.data = data;
      this.renderContent();
    });
  }

  protected renderContent() {
    this.element.querySelector(
      "#table-title"
    )!.textContent = this.destination.toUpperCase();

    if (this.isInit) {
      createColumns(
        this.element.querySelector("#table-header") as HTMLElement,
        this.columnNames,
        this.destination
      );
      this.isInit = false;
    }
    populateTable<T>(this.destination, this.element, this.data);
  }
}
