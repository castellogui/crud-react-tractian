import { Unit } from "../models/unit.interface";

export interface changeUnit {
  type: string;
  payload: Unit;
}
