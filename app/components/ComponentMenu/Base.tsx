import React from 'react';
import { dragStart } from '../../utils/drag';

export default function Base(): JSX.Element {
  return (
    <div>
      <div key="button">
        <h2>按钮</h2>
        <button
          type="button"
          draggable
          onDragStart={(e) => dragStart(e, 'button', 'button')}
        >
          按钮1
        </button>
      </div>
    </div>
  );
}
