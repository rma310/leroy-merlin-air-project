import { Message } from "../models/model";
import { State } from "./state";

/**
 * message state
 * manages messages data for notifications
 * extends generic state
 */
export class MessageState extends State<Message> {
  private static instance: MessageState;

  private constructor() {
    super([]);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new MessageState();
    return this.instance;
  }

  /**
   * adds a message to notifications queue
   * @param message 
   */
  addMessage(message: string) {
    const id = message
      .replace(/\s/g, "")
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase();
    this.data.unshift({
      id,
      message,
    });
    // removes notification after 2 seconds
    setTimeout(() => {
      this.removeMessage(id);
      this.updateListeners();
    }, 2000);
    this.updateListeners();
  }

  removeMessage(id: string) {
    const messageIndex = this.data.findIndex((message) => message.id === id);
    this.data.splice(messageIndex, 1);
    this.updateListeners();
  }
}

export const messageState = MessageState.getInstance();
