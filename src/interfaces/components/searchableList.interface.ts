import { Unit } from "../models/unit.interface";

export interface SearchableList {
  changeOption?: boolean;
  companyFilter?: string;
  userLogged?: any;
  unitState: Unit;
  height: number;
  buttonFunction: Function;
}
