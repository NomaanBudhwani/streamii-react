import { normalize, schema } from 'normalizr';
import { put, takeEvery } from 'redux-saga/effects';
// import {selectUser} from '../sagaSelectors';
import { GENERAL_POSTS, HOME_POSTS, NORMALIZE_POSTS } from '../actions/ActionTypes';
import { success } from '../actions/ServiceAction';

function* watchRequest(action) {
  const { data, meta, isConcat, reducerType } = action;
  const eventSchema = new schema.Entity('posts');
  const userListSchema = [eventSchema];
  const normalizedData = normalize(data, userListSchema);

  yield put(success(GENERAL_POSTS, normalizedData.entities.posts));
  yield put(
    success(reducerType || HOME_POSTS, normalizedData.result, meta, isConcat),
  );
}

export default function* root() {
  yield takeEvery(NORMALIZE_POSTS.SUCCESS, watchRequest);
}
