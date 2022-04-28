import axios from 'axios';

const imageApiUrl = '/api/annotation';

export function exportAnnotation(id: number) {
  const url = `${imageApiUrl}/${id}`;
  axios.get(url);
}
