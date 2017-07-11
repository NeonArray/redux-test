const redux = require('redux');
const actions = require('./actions/index');
const store = require('./store/configureStore').configure(); 

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  
  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = `<a target="_blank" href="${state.map.url}">View Location</a>`;
  }
});

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Aaron'));

store.dispatch(actions.addMovie('Horror', 'Scream'));

store.dispatch(actions.addMovie('Action', 'Last Action Hero'));

store.dispatch(actions.addHobby('Running'));

store.dispatch(actions.addHobby('Walking'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.removeMovie(1));

store.dispatch(actions.changeName('Bobert'));