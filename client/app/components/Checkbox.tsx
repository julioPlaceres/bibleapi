"use client";
import React, { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    }

const Checkbox: React.FC<CheckBoxProps> = ({ label, name, ...props }) => {
    return (
      <label>
        {label}
        <input type="checkbox" name={name} {...props} />
      </label>
    );
  }

  export default Checkbox;