import { Plan } from "../models/model";
import { State } from "./state";

/**
 * plan state
 * manages plans data
 * extends generic state
 */
export class PlanState extends State<Plan> {
  
  private static instance: PlanState;

  private constructor() {
    super([]);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PlanState();
    return this.instance;
  }

  addPlan(plan: Plan) {
    this.data.push(plan);
    this.updateListeners();
  }
}

export const planState = PlanState.getInstance();
