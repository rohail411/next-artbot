import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { put, takeLatest } from 'redux-saga/effects';

export const actionTypes = {
    Login: '[Login] Action',
    Logout: '[Logout] Action',
    Register: '[Register] Action',
    UserRequested: '[Request User] Action',
    UserLoaded: '[Load User] Auth API'
};

const initialAuthState = {
    user: undefined,
    authToken: undefined
};

export const reducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.Login: {
            return { ...state, user: action.payload.user, authToken: action.payload.authToken };
        }

        case actionTypes.Register: {
            const { authToken } = action.payload;

            return { authToken, user: undefined };
        }

        case actionTypes.Logout: {
            return {
                ...state,
                user: null,
                authToken: null
            };
        }

        case actionTypes.UserLoaded: {
            const { user } = action.payload;
            return { ...state, user };
        }

        default:
            return state;
    }
};

export const actions = {
    login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
    register: (authToken) => ({
        type: actionTypes.Register,
        payload: { authToken }
    }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: (user) => ({ type: actionTypes.UserRequested, payload: { user } }),
    fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export const loginUser = (user, authToken) => ({
    type: 'USER_LOGIN_SAGA',
    payload: { user: user, authToken: authToken }
});
export const logout = () => ({ type: actionTypes.Logout });
export function* saga() {
    yield takeLatest('USER_LOGIN_SAGA', function* loginUser(data) {
        yield put({ type: actionTypes.Login, payload: data.payload });
    });
    yield takeLatest('TEST', function* loginSaga() {
        yield put(actions.requestUser());
    });

    yield takeLatest(actionTypes.Register, function* registerSaga() {
        yield put(actions.requestUser());
    });

    yield takeLatest(actionTypes.UserRequested, function* userRequested() {
        const { data: user } = yield getUserByToken();

        yield put(actions.fulfillUser(user));
    });
}
