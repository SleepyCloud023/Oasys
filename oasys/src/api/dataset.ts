import axios from 'axios';

const datasetApiUrl = '/api/dataset';

export async function deleteDatasetById(id: number) {
  const url = `${datasetApiUrl}/${id}`;
  const { data } = await axios.delete(url);

  return data;
}
