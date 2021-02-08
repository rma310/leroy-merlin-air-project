import { Customer } from "../models/customer";
import { Drone } from "../models/drone";
import { Order } from "../models/order";
import { Store } from "../models/store";

const drones: Drone[] = [
  {
    id: "Alpha",
    x: 5,
    y: 10,
    autonomy: 100,
  },
  {
    id: "Beta",
    x: 2,
    y: 7,
    autonomy: 100,
  },
  {
    id: "Gamma",
    x: 6,
    y: 20,
    autonomy: 100,
  },
  {
    id: "Delta",
    x: 4,
    y: 43,
    autonomy: 100,
  },
  {
    id: "Epsilon",
    x: 9,
    y: 9,
    autonomy: 100,
  },
];

const stores: Store[] = [
  {
    id: "Villeneuve",
    x: 3,
    y: 3,
    stock: [
      {
        productId: "Axe",
        quantity: 10,
      },
      {
        productId: "Hammer",
        quantity: 2,
      },
    ],
  },
  {
    id: "Roncq",
    x: 23,
    y: 45,
    stock: [
      {
        productId: "Axe",
        quantity: 1,
      },
      {
        productId: "Nail",
        quantity: 3,
      },
    ],
  },
  {
    id: "Lesquin",
    x: 10,
    y: 14,
    stock: [
      {
        productId: "Nail",
        quantity: 2,
      },
      {
        productId: "Hammer",
        quantity: 1,
      },
    ],
  },
];

const customers: Customer[] = [
  {
    id: "Jean Dupont",
    x: 5,
    y: 8,
  },
  {
    id: "Michelle Smith",
    x: 20,
    y: 20,
  },
  {
    id: "Robert Martin",
    x: 12,
    y: 3,
  },
];

const orders: Order[] = [
  {
    id: "LMFRORDER-1",
    customerId: "Jean Dupont",
    basket: [
      {
        productId: "Axe",
        quantity: 5,
      },
      {
        productId: "Nail",
        quantity: 1,
      },
      {
        productId: "Hammer",
        quantity: 1,
      },
    ],
    status: "PENDING",
  },
  {
    id: "LMFRORDER-2",
    customerId: "Michelle Smith",
    basket: [
      {
        productId: "Nail",
        quantity: 1,
      },
      {
        productId: "Hammer",
        quantity: 1,
      },
    ],
    status: "PENDING",
  },
  {
    id: "LMFRORDER-3",
    customerId: "Robert Martin",
    basket: [
      {
        productId: "Hammer",
        quantity: 1,
      },
      {
        productId: "Axe",
        quantity: 5,
      },
    ],
    status: "PENDING",
  },
];

export default { drones, stores, customers, orders };
