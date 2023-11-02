'use client';

import React, { useState } from 'react';
import BookForm from '../../components/forms/Book';
import CharacterForm from '../../components/forms/Character';

interface FormProps {
    params: {
      id: string;
    };
  }

const Form: React.FC<FormProps> = ({params}) => {
  const [formType, setFormType] = useState<string>('');

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value);
  };

  const renderForm = () => {
    switch (formType) {
      case 'book':
        fetchData('books')
        return <BookForm />;
      case 'character':
        return <CharacterForm />;
      default:
        return null;
    }
  }

  const fetchData = (endpoint: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${params.id}`)
        .then(response => response.json())
        .then(data => {console.log(data)})
        .catch(error => console.error('Error:', error));
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
