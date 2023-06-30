import axios from 'axios';

const API_KEY = '36427900-70ae1c90a640d0a3e2de3b856';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = async (query, page) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&page=${page}&q=${query}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
};
