import { Unit } from "../models/unit.interface";

export interface SearchableList {
  userLogged?: any;
  unitState: Unit;
  height: number;
  buttonFunction: Function;
}
