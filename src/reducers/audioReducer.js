import { PLAY_AUDIO, PAUSE_AUDIO } from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  data: null,
  current: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAY_AUDIO:
      let playState = { ...state }

      if (state.current) {
        global.log('current');
        playState['data'] = {
          ...state['data'],
          [action.data.name]: {
            [state.current.id]: { paused: true },
            [action.data.id]: { paused: false }
          },
        }
      } else {
        playState['data'] = {
          [action.data.name]: {
            [action.data.id]: { paused: false }
          },
        }
      }

      playState['current'] = {
        name: action.data.name,
        id: action.data.id
      }

      return playState

    case PAUSE_AUDIO:
      let pauseState = { ...state }

      if (action.data.name && action.data.id) {
        pauseState['data'] = {
          ...state.data,
          [action.data.name]: {
            ...state.data[action.data.name],
            [action.data.id]: { paused: true }
          },
        }
      } else if (action.data.name) {
        // find id
        const id =
          state.data?.[action.data.name] &&
          Object.keys(state.data?.[action.data.name]).find(
            key => !state.data?.[action.data.name][key].paused,
          );
        if (id && id != -1) {
          pauseState['data'] = {
            ...state.data,
            [action.data.name]: {
              ...state.data[action.data.name],
              [id]: { paused: true }
            }
          }
        }
      }
      return pauseState
    default:
      return state;
  }
};
