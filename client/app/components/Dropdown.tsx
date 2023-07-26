"use client";
import React, { SelectHTMLAttributes } from 'react';

interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

const DropDown: React.FC<DropDownProps> = ({ label, name, options, ...props }) => {
  return (
    <label>
      {label}
      <select name={name} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DropDown;
