//URL API: https://api.themoviedb.org/3/movie/now_playing?api_key=2352ba171d1558658f6f3c949589a217
//BAse da URL: https://api.themoviedb.org/3
//API_KEY: api_key=2352ba171d1558658f6f3c949589a217

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;