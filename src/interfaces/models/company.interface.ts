import { Unit } from "./unit.interface";
import { User } from "./user.interface";

export interface Company {
  _id: string;
  name: string;
  units: Array<Unit>;
  users: Array<User>;
  created_at: Date;
}

export interface UpdatedCompany {
  _id?: string;
  name?: string;
  units?: Array<Unit>;
  users?: Array<User>;
  created_at?: Date;
}
