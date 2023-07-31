"use client";
import React, { SelectHTMLAttributes } from 'react';

interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

const DropDown: React.FC<DropDownProps> = ({ label, name, options, ...props }) => {
  return (
    <div className='mb-4'>
    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
      {label}
      <select id={name} name={name} {...props}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
    </div>
  );
};

export default DropDown;
