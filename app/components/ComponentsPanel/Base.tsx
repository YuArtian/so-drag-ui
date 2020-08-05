import React from 'react';

export default function Base(): JSX.Element {
  return (
    <div>
      <div key="button">
        <h2>按钮</h2>
        <button type="button" draggable>
          按钮1
        </button>
      </div>
    </div>
  );
}
