import { Customer } from "../models/customer";
import { Drone } from "../models/drone";
import { IDistance } from "../models/model";
import { Order } from "../models/order";
import { Store } from "../models/store";
import { droneState } from "../state/drone-state";
import { messageState } from "../state/message-state";
import { orderState } from "../state/order-state";

/**
 * journey service
 * processes drones movements
 */

interface Coordinates {
  id: string;
  x: number;
  y: number;
}

/**
 * generic distance calculator
 * calculates distances from an entity to each other entities
 * @param to
 * @param from
 */
function getDistancesTo<T extends Coordinates, U extends Coordinates>(
  to: T[] | Partial<T>[],
  from: U | Partial<U>
): IDistance[] {
  return (to as (T | Partial<T>)[]).map((el) => ({
    id: el.id!,
    distance: Math.sqrt(
      Math.pow(el.x! - from.x!, 2) + Math.pow(el.y! - from.y!, 2)
    ),
  }));
}

/**
 * inits drone journey
 * @param d
 * @param distance
 * @param pid
 * @param c
 * @param o
 */
export function fly(
  d: Drone,
  distance: number,
  pid: string,
  c: Customer,
  o: Order
) {
  droneState.updateDroneJourney(d, c, distance, () => {
    if (o.basket.every((_pq) => _pq.quantity === 0)) {
      orderState.udpateOrderStatus(o, "DELIVERED");
    }
    messageState.addMessage(`${d.id} delivered ${pid} to ${c.id}`);
  });
}

/**
 * get all possible paths to customer from stores and drones positions
 * sorted by distance length
 * @param customer
 * @param stores
 * @param drones
 */
export function getPaths(
  customer: Customer,
  stores: Partial<Store>[],
  drones: Drone[]
): {
  storeId: string;
  droneId: string;
  distance: number;
}[] {
  /**
   * get distances from customer to each store
   */
  const sToc = getDistancesTo<Store, Customer>(stores, customer);

  /**
   * get distances from each store to each drones
   */
  const distances = sToc.map((s) =>
    getDistancesTo<Drone, Store>(
      drones,
      stores.find((_s) => _s.id === s.id)!
    ).map((d) => ({
      storeId: s.id,
      droneId: d.id,
      distance: s.distance + d.distance,
    }))
  );

  const flatten = distances.reduce((acc, curr) => acc.concat(curr), []);

  return [...flatten].sort((a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  });
}
