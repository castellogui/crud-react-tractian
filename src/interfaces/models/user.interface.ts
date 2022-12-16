import { Company } from "./company.interface";
import { Unit } from "./unit.interface";

export interface User {
  _id: string;
  name: string;
  familyName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  created_at: string;
  lastLogin: string;
  company: {
    _id: string;
    name: string;
    units: string[];
    users: string[];
    created_at: string;
    __v: number;
  };
  type: string[];
  __v: number;
}
