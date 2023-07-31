'use client';
import { useEffect, useState } from 'react';
import { Italiana } from 'next/font/google';

const itali = Italiana({
  weight: '400',
  subsets: ['latin'],
})

export default function Search() {
  const [filterSentence, setFilterSentence] = useState('');

  useEffect(() => {
    setFilterSentence('I want to look for a verse that contains the word "love"');
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center p-24 bg-cover bg-center" style={{ backgroundImage: 'url(/cross.jpg)' }}>
      <h1 className='text-2xl mb-5'>Search an entry</h1>
      
      <div className='my-5'>
        <h1 className={`text-4xl ${itali.className}`}>{filterSentence}</h1>
      </div>
    </section>
  )
}
