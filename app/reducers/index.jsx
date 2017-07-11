export let nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    break;
    default:
      return state;
    break;
  }
};

let nextHobbyId = 0;
export let hobbiesReducer = (state = [], action) => {
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

let nextMovieId = 0;
export let moviesReducer = (state = [], action) => {
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

export let mapReducer = (state = { isFetching: false, url: undefined }, action) => {
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
