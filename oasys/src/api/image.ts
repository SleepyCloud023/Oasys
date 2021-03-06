import axios from 'axios';

type ImageResponse = {};

const imageApiUrl = '/api/image_metadata';

export async function deleteImageById(id: number) {
  const url = `${imageApiUrl}/${id}`;
  const { data } = await axios.delete(url);

  return data;
}
