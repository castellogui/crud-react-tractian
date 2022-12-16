import { logUser } from "../../interfaces/actions/actions.interface";
import { User } from "../../interfaces/models/user.interface";
import { LOG_OFF_USER, LOG_USER } from "../actions/actionTypes";

const initialState: User = {
  _id: "",
  name: "",
  familyName: "",
  username: "",
  email: "",
  password: "",
  avatar: "",
  created_at: "",
  lastLogin: "",
  company: {
    _id: "",
    name: "",
    units: [],
    users: [],
    created_at: "",
    __v: 0,
  },
  type: [],
  __v: 0,
};

export const userLoggedReducer = (state = initialState, action: logUser) => {
  switch (action.type) {
    case LOG_USER:
      if (action.payload != undefined) {
        return {
          ...state,
          _id: action.payload._id,
          name: action.payload.name,
          familyName: action.payload.familyName,
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          avatar: action.payload.avatar,
          created_at: action.payload.created_at,
          lastLogin: action.payload.lastLogin,
          company: {
            _id: action.payload._id,
            name: action.payload.company.name,
            units: action.payload.company.units,
            users: action.payload.company.users,
            created_at: action.payload.company.created_at,
            __v: action.payload.company.__v,
          },
          type: action.payload.type,
          __v: action.payload.__v,
          token: action.payload.token,
        };
      }
      return initialState;
    case LOG_OFF_USER:
      return initialState;
    default:
      return state;
  }
};
