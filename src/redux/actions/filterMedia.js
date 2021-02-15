import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';

export const filter = (media) => ({ type: 'FILTER_MEDIA_SAGA', media: media });

export const filterReset = () => ({ type: 'FILTER_RESET_SAGE' });

export const _sortByDate = (name, value) => ({ type: 'FILTER_DATE_SAGA', value, name });

export function* saga() {
    yield takeLatest('FILTER_MEDIA_SAGA', function* filterSaga(data) {
        yield put({ type: actions.FILTER_CHANGE, media: data.media });
    });
    yield takeLatest('FILTER_RESET_SAGE', function* filterResetSaga(data) {
        yield put({ type: actions.FILTER_RESET });
    });
    yield takeLatest('FILTER_DATE_SAGA', function* filterDateSaga(data) {
        yield put({ type: actions.FILTER_DATE, value: data.value, name: data.name });
    });
}
