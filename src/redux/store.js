import {
    createStore,
    applyMiddleware
} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'; // 异步中间件

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

/**
 * redux的核心
 */