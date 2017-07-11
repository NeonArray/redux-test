const redux = require('redux');

const stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

let nextHobbyId = 1;
let nextMovieId = 1;

let nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    break;
    default:
      return state;
    break;
  }
};

let hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
            id: nextHobbyId++,
            hobby: action.hobby
        }
      ];
    break;
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default:
      return state;
    break;
  }
};

let moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          genre: action.genre,
          movie: action.movie
        }
      ];
    break;
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
    break;
  }
};

let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

// Create a store and enable dev tools
const store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log("name is", state.name);
});

// you can unsubscribe
// unsubscribe();

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Aaron'
});

store.dispatch({
  type: 'ADD_MOVIE',
  genre: 'Horror',
  movie: 'Scream'
});

store.dispatch({
  type: 'ADD_MOVIE',
  genre: 'Action',
  movie: 'Last Action Hero'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Bobert'
})
console.log('Name should be Aaron', store.getState());