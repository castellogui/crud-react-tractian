import { Unit } from "./unit.interface";
import { User } from "./user.interface";

export interface Asset {
  name: String;
  unit: Unit;
  description: String;
  image: String;
  model: String;
  owner: User;
  status: String;
  healthLevel: Number;
  created_at: Date;
}
