// NOTE: 다음 URL을 참조하였음 https://usehooks.com/useEventListener/
import * as React from 'react';

export interface GlobalEventHandler<
  K extends keyof GlobalEventHandlersEventMap,
> {
  (event: GlobalEventHandlersEventMap[K]): any;
}

function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
  eventName: K,
  eventHandler: GlobalEventHandler<K>,
  element: HTMLElement | Window = window,
) {
  const freshHandlerRef = React.useRef<typeof eventHandler>(eventHandler);

  React.useEffect(() => {
    freshHandlerRef.current = eventHandler;
  }, [eventHandler]);

  React.useEffect(() => {
    // TODO: 리팩토링: 클래스 타입체크를 안해주면 두 클래스의 공통 메소드의 listner type: EventListenerOrEventListenerObject을 요구함
    // element.addEventListener(eventName, eventHandler);

    const freshHandler: typeof eventHandler = (event) =>
      freshHandlerRef.current(event);

    if (element instanceof Window) {
      element.addEventListener(eventName, freshHandler);
    } else {
      element.addEventListener(eventName, freshHandler);
    }
    return () => {
      // element.removeEventListener(eventName, eventHandler);

      if (element instanceof Window) {
        element.removeEventListener(eventName, freshHandler);
      } else {
        element.removeEventListener(eventName, freshHandler);
      }
    };
  }, [element, eventName]);
}

export default useEventListener;
