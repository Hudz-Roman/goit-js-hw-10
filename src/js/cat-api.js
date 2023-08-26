import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_ncUtVlBRIbdLZLXml0WwxxlZdlVJIuw3IuXDRvKJUlRfRbaBPLck81IvKiDRLEJ6';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get(`${BASE_URL}breeds`);
}

export function fetchCatByBreed(breedId) {
  const params = {
    breed_ids: breedId,
  };

  return axios.get(`${BASE_URL}images/search`, { params });
}
