import { fetchBreeds } from './cat-api';

function createOptionsMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value='${id}'>${name}</option>`)
    .join();
}

function createCatInfoMarkup(arr) {
  console.log(arr);
  return arr.map(
    ({
      url,
      name,
      description,
      temperament,
    }) => `<img class="cat-img" src="${url}" alt="${name}" width="400">
    <div class="wrapper">
    <h1 class="cat-breed">${name}</h1>
    <p class="cat-descr">${description}</p>
    <p class="cat-temp"><b>Temperament: </b>${temperament}</p>
    </div>`
  );
}

function getCatsInfo(arr) {
  return arr;
}

export { createCatInfoMarkup, createOptionsMarkup, getCatsInfo };
