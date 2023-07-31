"use client";
import React, { InputHTMLAttributes } from 'react';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextBox: React.FC<TextBoxProps> = ({ label, name, ...props }) => {
  return (
    <div className='mb-4'>
    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
      {label}
      <input id={name} type="text" name={name} 
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      {...props} />
    </label>
    </div>
  );
};

export default TextBox;
