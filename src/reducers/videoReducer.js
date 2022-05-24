import { SET_VIDEO_TO_PLAY, PAUSE_VIDEO } from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_TO_PLAY:
      return {
        ...state,
        data: {
          ...state.data,
          [action.data.name]: {
            [action.data.previousId]: { paused: true },
            [action.data.currentId]: { paused: false },
          },
        },
      };
    case PAUSE_VIDEO:
      const { name, id } = action.data;
      let pauseObj = {};
      if (id && name) {
        pauseObj[name] = {
          ...state.data[name],
          [id]: { paused: true },
        };
      } else if (name) {
        // find id
        const key =
          state.data?.[name] &&
          Object.keys(state.data?.[name]).find(
            key => !state.data?.[name][key].paused,
          );
        if (key && key != -1) {
          pauseObj[name] = {
            ...state.data?.[name],
            [key]: { paused: true },
          };
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...pauseObj,
        },
      };
    default:
      return state;
  }
};
