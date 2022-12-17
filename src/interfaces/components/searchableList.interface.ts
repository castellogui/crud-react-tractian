import { Unit } from "../models/unit.interface";

export interface SearchableList {
  reload?: boolean;
  triggerMove?: any;
  editableItems: boolean;
  changeOption?: boolean;
  companyFilter?: string;
  unitFilter?: string;
  userLogged?: any;
  unitState: Unit;
  height: number;
  buttonFunction: Function;
  buttonFunctionName?: Function;
}
