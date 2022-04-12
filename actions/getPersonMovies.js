
import Router from 'next/router';

import * as TYPES from './types';
import {tmdbAPI, firestoreToResult} from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';

// Get movies where the person entered
const getPersonMovies = (id, page, sort) => async dispatch => {
  try {
    dispatch({type: TYPES.SET_PERSON_MOVIES_LOADING});
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/movie`);
    await dispatch({
      type: TYPES.FETCH_PERSON_MOVIES,
      payload: firestoreToResult(response, true)
    });
    dispatch({type: TYPES.UNSET_PERSON_MOVIES_LOADING});
  } catch (error) {
    console.log('[getPersonMovies] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getPersonMovies;
