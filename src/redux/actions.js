/**
 * 函数工厂----分发actio  dispatch
 */

import ActionType from './action-types';


export const headTitleHandle = (data) => ({
    type: ActionType.HEADER_TITLE,
    data: data
});


export const saveUserInfo = (data) => ({
    type: ActionType.SAVE_USERINFO,
    data: data
});

export const saveBookId = (data) => ({
    type: ActionType.SAVE_BOOKID,
    data: data
})