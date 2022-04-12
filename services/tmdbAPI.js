
import axios from 'redaxios';

import {
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_API_READ_ACCESS_TOKEN
} from 'config/tmdb';

/**
 * TODO:
 * RE: https://developers.themoviedb.org/4/getting-started
 * Do however, encourage you to use the new `Authorization` header for all requests since it's a system you have to use for all application and user requests besides `GET` regardless.
 * Could encounter such an issue as https://google-chrome.atlassian.net/browse/GOOGLE-89?focusedCommentId=10979.
 */

export const tmdbAPI = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    //Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`
  }
});

const alternativeTmdbAPI = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    // api_key: TMDB_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});

export {
  alternativeTmdbAPI
};

export default tmdbAPI;

const documentToJson = (fields) => {
  const result = {};
  for (const field in fields) {
      const key = field, value = fields[field],
          isDocumentType = ['stringValue', 'booleanValue', 'doubleValue',
              'integerValue', 'timestampValue', 'mapValue', 'arrayValue'].find(t => t === key);
      if (isDocumentType) {
          let item = ['stringValue', 'booleanValue', 'doubleValue', 'integerValue', 'timestampValue']
              .find(t => t === key)
          if (item)
              return value;
          else if ('mapValue' == key)
              return documentToJson(value.fields || {});
          else if ('arrayValue' == key) {
              let list = value.values;
              return !!list ? list.map(l => documentToJson(l)) : [];
          }
      } else {
          result[key] = documentToJson(value)
      }
  }
  return result;
}

export const firestoreToResult = (response, keyAsId=false) => {
  console.log(response);
  if (response.data.fields) {
    const doc = documentToJson(response.data.fields);
    if (keyAsId) doc.id = response.data.name.split('/').pop();
    return doc;
  } else {
    return { results: response.data.documents?.map(it => {
      const doc = documentToJson(it.fields);
      if (keyAsId) doc.id = it.name.split('/').pop();
      return doc;
    }) || [] };
  }
};

