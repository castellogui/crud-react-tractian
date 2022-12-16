import { Unit } from "../models/unit.interface";
import { User } from "../models/user.interface";

export interface changeUnit {
  type: string;
  payload: Unit;
}

export interface logUser {
  type: string;
  payload: User;
}
