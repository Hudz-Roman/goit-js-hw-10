import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import {
  createCatInfoMarkup,
  createOptionsMarkup,
  getCatsInfo,
} from './js/markup';

import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('#js-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEL = document.querySelector('.error');

selectEl.addEventListener('change', onSelect);

function onSelect(evt) {
  catInfo.innerHTML = '';

  let breedsId = evt.target.value;
  hidden();

  fetchCatByBreed(breedsId)
    .then(resp => {
      setMarkup(catInfo, createCatInfoMarkup(resp.data));
      hidden();
    })
    .catch(fetchError);
}

fetchBreeds()
  .then(resp => {
    const cat = resp.data;
    setMarkup(selectEl, createOptionsMarkup(cat));
    slim();
    hidden();
    getCatsInfo(cat);
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
