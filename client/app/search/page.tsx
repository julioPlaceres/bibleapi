'use client';
import { useEffect, useState } from 'react';
import { Italiana } from 'next/font/google';

const itali = Italiana({
  weight: '400',
  subsets: ['latin'],
})

type Filter = {
  fieldType: string;
  fieldValue: string;
};

export default function Search() {
  const entityTypes = ['Book', 'Character', 'Location'];
  const fieldTypes = ['bookName', 'Description', 'Author'];

  const [currentFilters, setCurrentFilters] = useState<Filter[]>([]);
  const [filterSentence, setFilterSentence] = useState('');
  const [entityType, setEntityType] = useState('Book');
  const [fieldType, setFieldType] = useState('bookName');
  const [fieldValue, setFieldValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    let sentence = `I want to look for a ${entityType} `;
    currentFilters.forEach((filter, index) => {
      sentence.includes("whose")
        ?
        sentence += `${index > 0 ? ' and ' : ''}"${filter.fieldType}" with a value of "${filter.fieldValue}"`
        :
        sentence += `whose "${currentFilters[0].fieldType}" contains "${currentFilters[0].fieldValue}"`;
    });

    fetchData('search', setSearchResults);

    setFilterSentence(sentence);
  }, [currentFilters]);

  const fetchData = (endpoint: string, setStateFunc: React.Dispatch<React.SetStateAction<any[]>>) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "entityType": entityType,
        "filters": currentFilters,
    }),    
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setStateFunc(data);
        })
        .catch(error => console.error('Error:', error));
}

  const handleAdd = () => {
    setCurrentFilters([...currentFilters, { fieldType, fieldValue }]);
    setFieldType('');
    setFieldValue('');
  };

  const removeFilter = (index: number) => {
    const newFilters = [...currentFilters];
    newFilters.splice(index, 1);
    setCurrentFilters(newFilters);
};

  return (
    <section className="min-h-screen flex flex-col items-center p-24 bg-cover bg-center" style={{ backgroundImage: 'url(/cross.jpg)' }}>
      <h1 className='text-2xl mb-5'>Search an entry</h1>

      <div className='my-5'>

        <select value={entityType}
          onChange={e => setEntityType(e.target.value)}
          className='mr-2'>
          {entityTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>

        <select value={fieldType}
          onChange={e => setFieldType(e.target.value)}
          className='mr-2'>
          {fieldTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>

        <input value={fieldValue}
          onChange={e => setFieldValue(e.target.value)} />

        <button className='ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300'
          onClick={handleAdd}>
          Add
        </button>

        <h1 id='filterSentenceId' className={`text-4xl ${itali.className}`}>
          {filterSentence}
        </h1>

        {currentFilters.map((filter, index) => (
          <div className="px-2 bg-white text-black text-sm border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 mr-2 mb-2 w-20"
            key={index}
            onClick={() => removeFilter(index)}>
            {filter.fieldValue.substring(0, 13)}
          </div>
        ))}
      </div>
    </section>
  )
}
