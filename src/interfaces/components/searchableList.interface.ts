import { Unit } from "../models/unit.interface";

export interface SearchableList {
  changeOption?: boolean;
  userLogged?: any;
  unitState: Unit;
  height: number;
  buttonFunction: Function;
}
