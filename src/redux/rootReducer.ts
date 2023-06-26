import { combineReducers } from "redux";
import { videoReducer } from "./videoReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  videos: videoReducer,
  isAuth: authReducer,
});
