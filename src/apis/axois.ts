import { BASE_URL } from '@/constants';
import axios from 'axios';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
