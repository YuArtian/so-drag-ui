import { DragEvent } from 'react';

export function dragStart(event: DragEvent, type: string, name?: string) {
  event.dataTransfer?.setData(
    'component',
    JSON.stringify({ type, name: name || type })
  );
}

interface DropCallbackType {
  (type: string, name: string, clientX: number, clientY: number): void;
}

export function drop(event: DragEvent, callback: DropCallbackType) {
  event.preventDefault();
  const { type, name } = JSON.parse(event.dataTransfer?.getData('component'));
  callback(type, name, event.clientX, event.clientY);
}
