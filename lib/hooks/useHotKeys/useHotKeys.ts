import React from 'react';
import { addMultipleEventListeners, EventType } from '../../utils/events';
import { getObjectKeys } from '../../utils/helpers';
import { Handler, HotKeysHandlers, KeyMap, Keys } from './contracts';


const createHandlerId = (keys: Keys) => keys.join(';');

export function useHotKeys(isActive: boolean) {
  const keyDownMap = React.useRef<Partial<KeyMap>>({});
  const handlers = React.useRef<HotKeysHandlers>(new Map<string, Handler>());
  React.useEffect(
    () => {
      if (!isActive) {
        keyDownMap.current = {};
      }

      const unsubscribe = addMultipleEventListeners(document, ['keydown', 'keyup'], (event: KeyboardEvent) => {
        const type = event.type as EventType;
        const { key } = event;
        keyDownMap.current[key] = type === 'keydown';
        if (!isActive || type !== 'keydown') {
          return;
        }

        const pressedKeys = getObjectKeys(keyDownMap.current).filter((currentKey) => keyDownMap.current[currentKey]);
        const id = createHandlerId(pressedKeys);
        const handler = handlers.current.get(id);
        if (handler) {
          handler();
        }
      });
      return () => unsubscribe();
    },
    [isActive],
  );

  return {
    bind: (keys: Keys, handler: Handler) => {
      const id = createHandlerId(keys);
      handlers.current.set(id, handler);
    },
  };
}
