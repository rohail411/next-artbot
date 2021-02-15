import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';
export const searchResult = (data) => ({
    type: 'REARCH_RESULT_SAGA',
    payload: data
});

export function* saga() {
    yield takeLatest('REARCH_RESULT_SAGA', function* incSaga(data) {
        yield put({ type: actions.SEARCH_RESULT, payload: data.payload });
    });
}
