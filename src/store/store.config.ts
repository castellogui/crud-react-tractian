import { createStore, combineReducers } from "redux";
import { unitReducer } from "./reducers/unitReducer";
import { userLoggedReducer } from "./reducers/userLogged";

const reducers = combineReducers({
  unitState: unitReducer,
  userLogged: userLoggedReducer,
});

function storeConfig() {
  return createStore(reducers);
}

export default storeConfig();
