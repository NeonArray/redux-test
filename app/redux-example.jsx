const redux = require('redux');
const axios = require('axios');

// Name reducer and action generators
// ----------------------------------

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

let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
};


// Hobbies reducer and action generators
// ----------------------------------

let nextHobbyId = 1;
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

let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  };
};

let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  };
};


// Movies reducer and action generators
// ----------------------------------
let nextMovieId = 1;
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

let addMovie = (genre, movie) => {
  return {
    type: 'ADD_MOVIE',
    genre,
    movie
  };
};

let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};


// Map reducer and action generators
// ----------------------------------

let mapReducer = (state = { isFetching: false, url: undefined }, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    break;
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    break;
    default:
      return state;
    break;
  }
};

let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

let fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then((res) => {
    let loc = res.data.loc;
    let baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
};


let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

// Create a store and enable dev tools
const store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  
  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = `<a target="_blank" href="${state.map.url}">View Location</a>`;
  }
});

fetchLocation();

store.dispatch(changeName('Aaron'));

store.dispatch(addMovie('Horror', 'Scream'));

store.dispatch(addMovie('Action', 'Last Action Hero'));

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Walking'));

store.dispatch(removeHobby(2));

store.dispatch(removeMovie(1));

store.dispatch(changeName('Bobert'));

console.log('Name should be Aaron', store.getState());