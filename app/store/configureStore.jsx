const redux = require('redux');
const { nameReducer, hobbiesReducer, moviesReducer, mapReducer } = require('./../reducers/index');
const thunk = require('redux-thunk').default;

export const configure = () => {
  let reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });

  // Create a store and enable dev tools
  return redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
};