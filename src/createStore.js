//store文件
function createStore(reducers) {
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

  return { getState, dispatch, subscribe }
}