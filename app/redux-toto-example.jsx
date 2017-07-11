const redux = require('redux');

console.log('Starting todo redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {

  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    break;
    default:
      return state;
    break;
  }

  return state;
};

const store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log("name is", state.name);
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'blah blah balh'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'teeb '
});

console.log('currentState', store.getState());