import React from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export function useArrayInput<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>(
  field: ControllerRenderProps<TFieldValues, TName>
) {
  const [inputValue, setInputValue] = React.useState(Array.isArray(field.value) ? field.value.join(', ') : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const arr = val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    field.onChange(arr as any);
  };

  return { inputValue, handleChange };
}
