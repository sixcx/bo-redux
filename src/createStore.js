//store文件
export default function createStore(reducers, hancer) {
  if (typeof hancer !== 'undefined') {
    return hancer(createStore)(reducers)
  }

  let state = null;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  const getState = () => state

  const dispatch = (action) => {
    state = reducers(state, action);
    listeners.forEach((listener) => listener());
  }

  dispatch({});

  return { getState, dispatch, subscribe };
}