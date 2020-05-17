import React from 'react';
import { addMultipleEventListeners, EventType, removeMultipleEventListeners } from '../../utils/events';
import { Handler, HotKeysHandlers, KeyMap, Keys } from './contracts';


export function useHotKeys(isActive: boolean) {
  const keyDownMap = React.useRef<KeyMap>({});
  const handlers = React.useRef<HotKeysHandlers>(new Map<string, Handler>());
  React.useEffect(
    () => {
      const eventsHandler = (event: KeyboardEvent) => {
        if (!isActive) {
          return;
        }

        const type = event.type as EventType;
        const { key } = event;

        keyDownMap.current[key] = type === 'keydown';

        if (type !== 'keydown') {
          return;
        }

        const combination = Object.keys(keyDownMap.current).filter((currentKey) => keyDownMap.current[currentKey]).join(';');
        const handler = handlers.current.get(combination);
        if (handler) {
          handler();
        }
      };

      addMultipleEventListeners(document, ['keydown', 'keyup'], eventsHandler);
      return () => removeMultipleEventListeners(document, ['keydown', 'keyup'], eventsHandler);
    },
    [isActive],
  );

  return {
    bind: (keys: Keys, handler: Handler) => {
      handlers.current.set(keys.join(';'), handler);
    },
  };
}
