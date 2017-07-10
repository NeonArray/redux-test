const redux = require('redux');

const stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

let nextHobbyId = 1;
let nextMovieId = 1;

let reducer = (state = stateDefault, action) => {

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    break;
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    break;
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            genre: action.genre,
            movie: action.movie
          }
        ]
      };
    break;
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
      };
    break;
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
      };
    break;
    default:
      return state;
    break;
  }

  return state;
};

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