import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEL = document.querySelector('.error');

//* ===================== Markup ============================

function optionsMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value='${id}'>${name}</option>`)
    .join();
}

function catInfoMarkup(arr) {
  return arr
    .map(
      ({
        url,
        breeds,
      }) => `<img class="cat-img" src="${url}" alt="${breeds[0].name}" width="400">
    <div class="wrapper">
    <h1 class="cat-breed">${breeds[0].name}</h1>
    <p class="cat-descr">${breeds[0].description}</p>
    <p class="cat-temp"><b>Temperament: </b>${breeds[0].temperament}</p>
    </div>`
    )
    .join();
}

//* ========================================================

selectEl.addEventListener('change', onSelect);

function onSelect(e) {
  catInfoEl.innerHTML = '';

  let breedIds = e.target.value;
  hidden();

  fetchCatByBreed(breedIds)
    .then(resp => {
      setMarkup(catInfoEl, catInfoMarkup(resp.data));
      hidden();
    })
    .catch(fetchError);
}

fetchBreeds()
  .then(resp => {
    setMarkup(selectEl, optionsMarkup(resp.data));
    slim();
    hidden();
  })
  .catch(fetchError);

function setMarkup(element, markup) {
  element.innerHTML = markup;
}

function slim() {
  new SlimSelect({
    select: '#js-select',
  });
}

function hidden() {
  loaderEl.classList.toggle('is-hidden');
  loaderEl.classList.toggle('loader');
}

function fetchError() {
  Report.failure('Error download', `${errorEL.textContent}`, 'OK');
}
