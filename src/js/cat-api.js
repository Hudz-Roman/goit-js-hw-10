import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_ncUtVlBRIbdLZLXml0WwxxlZdlVJIuw3IuXDRvKJUlRfRbaBPLck81IvKiDRLEJ6';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return axios.get(`${BASE_URL}breeds`);
}

function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`);
}

export { fetchBreeds, fetchCatByBreed };
