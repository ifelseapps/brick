export type EventType = keyof GlobalEventHandlersEventMap;
export type EventElement = Window | Document | HTMLElement;

export function addMultipleEventListeners(element: EventElement, events: EventType[], handler: EventHandlerNonNull): () => void {
  events.forEach((event) => element.addEventListener(event, handler));
  return () => events.forEach((event) => element.removeEventListener(event, handler));
}
