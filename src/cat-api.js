const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_sIXxIhH5PEDseaznuQkbwxuPtWjwE0jwlXci7FDiaXDbveTDUwL0OlupAruoMwz4';

export const fetchBreeds = () => {
  return fetch(BREEDS_URL).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
};

export const fetchCatByBreed = breedId => {
  return fetch(`${BASE_URL}?api_key=${API_KEY}&breed_ids=${breedId}`).then(
    res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    }
  );
};
