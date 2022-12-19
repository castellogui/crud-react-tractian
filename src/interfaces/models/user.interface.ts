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
  token?: string;
}

export interface UpdatedUser {
  _id?: string;
  name?: string;
  familyName?: string;
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  created_at?: string;
  lastLogin?: string;
  company?: {
    _id?: string;
    name?: string;
    units?: string[];
    users?: string[];
    created_at?: string;
    __v?: number;
  };
  type?: string[];
  __v?: number;
  token?: string;
}
