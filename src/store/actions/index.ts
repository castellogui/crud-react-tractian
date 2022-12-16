import { Unit } from "../../interfaces/models/unit.interface";
import { User } from "../../interfaces/models/user.interface";
import { CHANGE_UNIT, LOG_USER } from "./actionTypes";

export const changeUnit = (unit: Unit) => {
  return {
    type: CHANGE_UNIT,
    payload: unit,
  };
};

export const logUser = (user: User) => {
  return {
    type: LOG_USER,
    payload: user,
  };
};
