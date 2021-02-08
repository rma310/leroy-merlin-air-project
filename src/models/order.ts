import { IProductQuantity } from "./model";

export class Order {
  constructor(
    public id: string,
    public customerId: string,
    public basket: IProductQuantity[],
    public status: "PENDING" | "PROCESSING" | "DELIVERED" = "PENDING"
  ) {}
}
