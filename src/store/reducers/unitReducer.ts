import { changeUnit } from "../../interfaces/actions/actions.interface";
import { CHANGE_UNIT } from "../actions/actionTypes";

const initialState = {
  _id: "all",
  name: "",
  zipCode: "",
  created_at: "",
  assets: [],
  company: {
    _id: "",
    name: "",
    units: [],
    users: [],
    created_at: "",
    __v: "",
  },
  __v: "",
};

export const unitReducer = (state = initialState, action: changeUnit) => {
  switch (action.type) {
    case CHANGE_UNIT:
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        zipCode: action.payload.zipCode,
        created_at: action.payload.created_at,
        assets: action.payload.assets,
        company: {
          _id: action.payload.company._id,
          name: action.payload.company.name,
          units: action.payload.company.units,
          users: action.payload.company.users,
          created_at: action.payload.company.created_at,
          __v: action.payload.company.__v,
        },
        __v: action.payload.__v,
      };
    default:
      return state;
  }
};
