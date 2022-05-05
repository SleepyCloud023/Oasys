import axios from 'axios';

const workspaceApiUrl = '/api/workspace';

export async function deleteWorkspaceById(id: number) {
  const url = `${workspaceApiUrl}/${id}`;
  const { data } = await axios.delete(url);

  return data;
}
