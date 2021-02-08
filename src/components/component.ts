/**
 * component class extended by all sub components
 */
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  private templateElement: HTMLTemplateElement;
  private hostElement: T;
  protected element: U;

  constructor(
    templateId: string, // what to render
    hostElementId: string, // inside what
    insertAtStart: boolean, // where
    newElementId?: string // with an id
  ) {
    /**
     * gets html template element
     */
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    /**
     * gets the host element
     */
    this.hostElement = document.getElementById(hostElementId)! as T;

    /**
     * gets the html template element and all its children
     */
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  /**
   * adds the html template element to the DOM
   */
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  /**
   * forces user to implement configuration and rendering methods
   *
   * configure method: e.g add data listeners or event listeners
   * renderContent method: e.g attach element to the DOM on the fly
   */
  protected abstract configure(): void;
  protected abstract renderContent(): void;
}
