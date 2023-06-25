import createBreedOptions from './createBreedOptions.hbs';
import createBreedCard from './createBreedCard.hbs';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';

import 'lazysizes';

import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

const selectBreedEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loadingMessageEl = document.querySelector('.loader');
const errorMessageEl = document.querySelector('.error');

selectBreedEl.setAttribute('data-simplebar', '');

errorMessageEl.classList.add('is-hidden');

fetchBreeds()
  .then(options => {
    loadingMessageEl.classList.add('visually-hidden');
    selectBreedEl.innerHTML = createBreedOptions(options);
    new SlimSelect({
      select: '#breed-select',
    });
  })
  .catch(console.warn);

const changeHandler = event => {
  if (event.target.value == 'error') {
    return;
  }

  catInfoEl.innerHTML = '';
  loadingMessageEl.classList.remove('visually-hidden');

  setTimeout(() => {
    fetchCatByBreed(event.target.value)
      .then(info => {
        loadingMessageEl.classList.add('visually-hidden');

        catInfoEl.innerHTML = createBreedCard(info[0]);
      })
      .catch(console.warn);
  }, 1000);
};

selectBreedEl.addEventListener('change', changeHandler);
