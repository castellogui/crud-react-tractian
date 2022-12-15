export interface Unit {
  _id: string;
  name: string;
  zipCode: string;
  created_at: string;
  assets: string[];
  company: {
    _id: string;
    name: string;
    units: string[];
    users: string[];
    created_at: string;
    __v: number;
  };
  __v: number;
}
