import { firestoreToResult } from "./tmdbAPI";
import fetch from 'node-fetch';

export const api = {
    get: () => fetch('https://firestore.googleapis.com/v1/projects/movies-app-mgechev/databases/%28default%29/documents/movie?pageSize=3').
            then(res => res.json()).
            then(data => firestoreToResult({ data }, true))
}