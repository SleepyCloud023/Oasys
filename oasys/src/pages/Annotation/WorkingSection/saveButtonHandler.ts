import { Annotation } from './types';
import { postNewAnnotation } from './utils';

export async function saveAndAlert(
  event: MouseEvent,
  id: number,
  newAnnotation: Annotation,
  setAlert: React.Dispatch<any>,
) {
  const name = (event.target as HTMLElement).getAttribute('name');
  if (name !== 'save-button') {
    return;
  }

  const response = await postNewAnnotation(id, newAnnotation);

  const successObject = {
    open: true,
    success: true,
    message: 'Save Success!!',
  };
  const failObject = {
    open: true,
    success: false,
    message: 'Save Error : ' + response.data.error_msg,
  };
  const alertObject = response.data.success ? successObject : failObject;

  setAlert(alertObject);
}
