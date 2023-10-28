import { useContext } from 'react';
import RadioContext from './RadioContext';

export default function Radio({
  children,
  value,
  name,
  defaultChecked,
  disabled,
}: {
  children?: any;
  value?: any;
  name?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const group: any = useContext(RadioContext);

  return (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={e => group.onChange && group.onChange(e.target.value)}
      />
      {children}
    </label>
  );
}