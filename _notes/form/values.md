Yes 👍

`onBlur` works with **any plain `<input />`** in React (not just inside forms).

In React:

- `onChange` → fires every time the value changes (when the user types, deletes, etc.).
- `onBlur` → fires **once** when the input loses focus (when the user clicks/tabs away).
- `onFocus` → fires when the input gets focus.

Example with a plain input:

```tsx
import { useState } from 'react';

export default function Demo() {
  const [value, setValue] = useState('');
  const [finalValue, setFinalValue] = useState('');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          console.log('onChange:', e.target.value);
          setValue(e.target.value); // update immediately while typing
        }}
        onBlur={(e) => {
          console.log('onBlur (final):', e.target.value);
          setFinalValue(e.target.value); // save only when leaving input
        }}
        placeholder="Type something"
      />

      <p>Live value (onChange): {value}</p>
      <p>Final value (onBlur): {finalValue}</p>
    </div>
  );
}
```

👉 Here:

- While typing → `onChange` updates `value` in real-time.
- When you click away → `onBlur` saves the final value into `finalValue`.

---
