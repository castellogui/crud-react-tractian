import { Company } from "./company.interface";

export interface User {
  name: String;
  familyName: String;
  username: String;
  email: String;
  password: String;
  avatar: String;
  created_at: Date;
  lastLogin: Date;
  company: Company;
  type: String;
}
