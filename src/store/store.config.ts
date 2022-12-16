import { createStore, combineReducers } from "redux";
import { unitReducer } from "./reducers/unitReducer";

const reducers = combineReducers({
  unitState: unitReducer,
});

function storeConfig() {
  return createStore(reducers);
}

export default storeConfig();
