import Router from 'next/router';

import * as TYPES from './types';
import {tmdbAPI, firestoreToResult} from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';

const getCredits = movieId => async dispatch => {
  try {
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/credit`);
    dispatch({
      type: TYPES.FETCH_CREDITS,
      payload: firestoreToResult(response)
    });
  } catch (error) {
    console.log('[getCredits] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getCredits;
