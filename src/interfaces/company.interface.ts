import { Unit } from "./unit.interface";
import { User } from "./user.interface";

export interface Company {
  name: String;
  units: Array<Unit>;
  users: Array<User>;
  created_at: Date;
}
