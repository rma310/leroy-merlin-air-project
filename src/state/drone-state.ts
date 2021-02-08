import { Drone } from "../models/drone";
import { State } from "./state";
import Mock from "../mocks/mock";
import { Customer } from "../models/customer";

/**
 * drone state
 * manages drones data
 * extends generic state
 */
export class DroneState extends State<Drone> {
  private static instance: DroneState;

  private constructor() {
    super(Mock.drones);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new DroneState();
    return this.instance;
  }

  /**
   * updates drone position and autonomy after a delivery
   * @param d 
   * @param c 
   * @param distance 
   * @param cb 
   */
  updateDroneJourney(
    d: Drone,
    c: Customer,
    distance: number,
    cb: Function
  ): void {
    d.x = c.x;
    d.y = c.y;
    cb();
    d.autonomy = Math.floor(d.autonomy - distance);
    
    this.updateListeners();
  }
}

export const droneState = DroneState.getInstance();
