import { Asset } from "./asset.interface";
import { Company } from "./company.interface";

export interface Unit {
  name: String;
  zipCode: Number;
  created_at: Date;
  assets: [Asset];
  company: Company;
}
