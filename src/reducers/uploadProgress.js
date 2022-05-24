import { UPLOAD_PROGRESS } from "../actions/ActionTypes";

const initialState = {
  progress: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      const { data } = action;
      return {
        progress: data.progress
      };
    default:
      return state;
  }
};