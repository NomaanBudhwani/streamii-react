import { SET_SEARCH_TEXT, SET_SEARCH_TAB } from "../actions/ActionTypes";

const initialState = {
  'Audio': '',

};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return { ...action.data };
    default:
      return state;
  }
};