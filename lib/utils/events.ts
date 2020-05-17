export type EventType = keyof GlobalEventHandlersEventMap;
export type EventElement = Window | Document | HTMLElement;

export function addMultipleEventListeners(element: EventElement, events: EventType[], handler: EventHandlerNonNull) {
  events.forEach((event) => element.addEventListener(event, handler));
}

export function removeMultipleEventListeners(element: EventElement, events: EventType[], handler: EventHandlerNonNull) {
  events.forEach((event) => element.removeEventListener(event, handler));
}
