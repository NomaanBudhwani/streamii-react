
import { SET_USER_TYPE } from "../actions/ActionTypes";
import _ from "lodash";
const initialState = {
  userType: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.data
      };
    default:
      return state;
  }
};
