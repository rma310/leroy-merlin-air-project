export interface IProductQuantity {
  productId: string;
  quantity: number;
}

export interface IStoreQuantity {
  storeId: string;
  quantity: number;
}

export interface IDistance {
  id: string;
  distance: number;
}

export class Stock {
  constructor(
    public productId: string,
    public availability: IStoreQuantity[]
  ) {}
}

export class Plan {
  constructor(
    public droneId: string,
    public storeId: string,
    public product: string,
    public customerId: string
  ) {}
}

export class Message {
  constructor(public id: string, public message: string) {}
}
