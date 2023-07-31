"use client";
import React, { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    }

const Checkbox: React.FC<CheckBoxProps> = ({ label, name, ...props }) => {
    return (
      <div className="mb-4 flex items-center">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
        <input id={name} type="checkbox" name={name} {...props} 
        className="ml-2 leading-tight"/>
      </label>
      </div>
    );
  }

  export default Checkbox;