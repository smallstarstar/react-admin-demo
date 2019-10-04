import {
    combineReducers
} from 'redux';
import ActionType from './action-types';

/**
 * 管理头部标题
 */
const initHeaderTitle = '首页';

function headerTitle(state = initHeaderTitle, action) {
    switch (action.type) {
        case ActionType.HEADER_TITLE:
            return state = action.data;
        default:
            return state
    }
}

function saveBookIds(state = '', action) {
    switch (action.type) {
        case ActionType.SAVE_BOOKID:
            return state = action.data;
        default:
            return state
    }
}

const reducer = combineReducers({
    headerTitle,
    saveBookIds
});

export default reducer;