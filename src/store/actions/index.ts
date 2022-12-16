import { Unit } from "../../interfaces/models/unit.interface";
import { CHANGE_UNIT } from "./actionTypes";

export const changeUnit = (unit: Unit) => {
  return {
    type: CHANGE_UNIT,
    payload: unit,
  };
};
