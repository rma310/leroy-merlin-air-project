import { Stock } from "../models/model";
import { getMockedStocks } from "../util/data-service";
import { State } from "./state";
import Mock from "../mocks/mock";

/**
 * stock state
 * manage stocks data
 * initial data is aggregated with getMockedStocks service from stores mocked data
 */
export class StockState extends State<Stock> {
  private static instance: StockState;

  private constructor() {
    super(getMockedStocks(Mock.stores));
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new StockState();
    return this.instance;
  }

  /**
   * updates stocks quantity for a given product in a a given store
   * @param pid 
   * @param q 
   * @param sid 
   */
  removeFromStocks(pid: string, q: number, sid: string) {
    let sq = this.data
      .find((s) => s.productId === pid)
      ?.availability.find((_sq) => _sq.storeId === sid);

    if (sq) {
      sq.quantity -= q;
    }
    this.updateListeners();
  }
}

export const stockState = StockState.getInstance();
