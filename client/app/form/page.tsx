import React from 'react';
import BookForm from '../components/forms/Book';
import CharacterForm from '../components/forms/Character';

const Form: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Book Form</h2>
      <BookForm />
      <CharacterForm />
      {/* Add more forms here as you create them */}
    </div>
  );
};

export default Form;
