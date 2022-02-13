import os
import json


def convert_pos_style(arr, pos_type):
    if pos_type == 'pororo_ocr':
        fixed_arr = [list(pos.values()) for pos in arr]
        return fixed_arr
    if pos_type == 'easy_ocr':
        return arr


def make_target_JSON(idx, classes, vertices, extra):
    return {
        "ObjectId": idx,
        "ClassName": classes,
        "Bbox": convert_pos_style(vertices, 'pororo_ocr'),
        "Extra": extra
    }


def pororo_to_json(pororo_result):
    result_DICT = {
        "ClassList": [],
        "TagList": [],
        "ObjectList": []
    }
    bbox_list = pororo_result['bounding_poly']

    for idx, target_bbox in enumerate(bbox_list):
        default_classes = []
        vertices = target_bbox['vertices']
        content_text = target_bbox['description']
        # TODO: 하나의 JSON 엘리먼트 생성 부분 함수화
        target_JSON = make_target_JSON(
            idx, default_classes, vertices, {"text": content_text})

        result_DICT['ObjectList'].append(target_JSON)
    return result_DICT


def filewrite_JSON(file_path, target):
    with open(file_path, 'w', encoding='utf-8') as fp:
        json.dump(target, fp, indent=4, ensure_ascii=False)