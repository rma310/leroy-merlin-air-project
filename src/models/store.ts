import { IProductQuantity } from "./model";

export class Store {
  constructor(
    public id: string,
    public x: number,
    public y: number,
    public stock: IProductQuantity[]
  ) {}
}
