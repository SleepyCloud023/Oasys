import { Annotation } from './types';
import { postNewAnnotation } from './utils';

function arrangeAnno(annotation: Annotation) {
  const target = annotation.box_object_list;
  target.sort(function (a, b) {
    return a.id - b.id;
  });
  annotation.box_object_list = target.map((object, index) => ({
    ...object,
    id: index,
  }));

  return annotation;
}

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

  const response = await postNewAnnotation(id, arrangeAnno(newAnnotation));

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
