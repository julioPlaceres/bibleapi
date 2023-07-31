'use client';
import React, { useState } from 'react';
import BookForm from '../components/forms/Book';
import CharacterForm from '../components/forms/Character';

const Form: React.FC = () => {
  const [formType, setFormType] = useState<string>('');

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value);
  };

  const renderForm = () => {
    switch (formType) {
      case 'book':
        return <BookForm />;
      case 'character':
        return <CharacterForm />;
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h2>Select a form</h2>
      <select value={formType} onChange={handleFormTypeChange}>
        <option value="">Select a form</option>
        <option value="book">Book</option>
        <option value="character">Character</option>
      </select>
      {renderForm()}
    </div>
  );
};

export default Form;
