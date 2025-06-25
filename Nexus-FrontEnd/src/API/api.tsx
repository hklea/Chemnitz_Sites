import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cultural-sites/getAll';

export const getAllSites = () => axios.get(API_URL);
