export interface Asset {
  _id: string;
  name: string;
  unit: {
    _id: string;
    name: string;
    zipCode: string;
    created_at: string;
    assets: string[];
    company: string;
    __v: number;
  };
  description: string;
  image: string;
  model: string;
  owner: {
    _id: string;
    name: string;
    familyName: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    created_at: string;
    lastLogin: string;
    company: string;
    type: string[];
    __v: number;
  };
  status: string;
  healthLevel: string;
  created_at: string;
  __v: number;
}
