"use client";
import React, { InputHTMLAttributes } from 'react';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextBox: React.FC<TextBoxProps> = ({ label, name, ...props }) => {
  return (
    <label>
      {label}
      <input type="text" name={name} {...props} />
    </label>
  );
};

export default TextBox;
