import { Message } from "../models/model";
import { messageState } from "../state/message-state";
import Component from "./component";

/**
 * notification component
 * pops up messages
 */
export class NotificationHandler extends Component<
  HTMLDivElement,
  HTMLDivElement
> {
  private messages: Message[];

  constructor() {
    super("notification", "app", false);
    this.messages = [];
    this.configure();
  }

  configure() {
    /**
     * subscribes to messages data changes
     */
    messageState.addListener((m) => {
      this.messages = m;
      this.renderContent();
    });
  }

  renderContent() {
    this.element.innerHTML = "";
    for (const m of this.messages) {
      const messageEl = document.createElement("div");
      messageEl.id = m.id;
      messageEl.textContent = m.message.trim();
      messageEl.classList.add("message");
      this.element.appendChild(messageEl);
    }
  }
}
