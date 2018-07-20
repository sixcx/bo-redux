//中间件
import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return function a(createStore) {
    return function b(reducer) {
      const store = createStore(reducer);
      let dispatch = store.dispatch;
      let chain = [];

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action) 
      }

      chain = middlewares.map(middleware => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      let mid = middleware(middlewareAPI);
      dispatch = mid(store.dispatch);

      return {
        ...store,
        dispatch
      }
    }
  }
}