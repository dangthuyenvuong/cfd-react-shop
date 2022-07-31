import { takeLatest, takeEvery } from 'redux-saga/effects'
import { fetchLogin, fetchLoginType } from './auth'
import { fetchCategories, fetchCategoriesType } from './product'


export function* rootSaga() {
    yield takeLatest(fetchLoginType, fetchLogin)
    yield takeLatest(fetchCategoriesType, fetchCategories)
}