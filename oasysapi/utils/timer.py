import time


def timer(original_func):
    def wrapper(*args, **kwargs):   # *args, **kwargs 매개변수 추가
        start = time.time()
        # 전달받은 *args, **kwargs를 입력파라미터로 기존함수 수행
        result = original_func(*args, **kwargs)
        end = time.time()
        print("(%s) running time: %f second" %
              (original_func.__name__, end - start))
        return result
    return wrapper
