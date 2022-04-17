import { Annotation, WorkState } from './types';
import { postNewAnnotation } from './utils';

function arrangeAnnotation(annotation: Annotation) {
  const target = annotation.box_object_list;
  annotation.box_object_list = target.map((object, index) => ({
    ...object,
    id: index,
  }));

  return annotation;
}

export async function saveAndAlert(
  event: MouseEvent,
  id: number,
  workState: WorkState,
  setAlert: React.Dispatch<any>,
) {
  const name = (event.target as HTMLElement).getAttribute('name');
  if (name !== 'save-button') {
    return;
  }

  const { box_object_list, category_list, tag_list } = workState;
  const newAnnotation = arrangeAnnotation({
    box_object_list,
    category_list,
    tag_list,
  });
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
