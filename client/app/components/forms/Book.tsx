"use client";
import React, { useState, useEffect } from 'react';
import TextBox from '../TextBox';
import DropDown from '../Dropdown';

const BookForm: React.FC = () => {
    const [bookName, setBookName] = useState('');
    const [authors, setAuthor] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/characters`)
            .then(response => response.json())
            .then(data => setAuthor(data.map((author: {name: string; id: number}) => ({ label: author.name, value: author.id }))))
            .catch(error => console.error('Error:', error));
    }, []);

    const historicalEvents = [{ label: 'Event 1', value: '1' }]; // Fetch these from your API
    const materials = [{ label: 'Material 1', value: '1' }]; // Fetch these from your API
    const locations = [{ label: 'Location 1', value: '1' }]; // Fetch these from your API
    const rivers = [{ label: 'River 1', value: '1' }]; // Fetch these from your API

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Call API to save the book
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextBox label="Book Name" name="name" value={bookName} onChange={e => setBookName(e.target.value)} />
            <DropDown label="Author" name="author" options={authors} />
            <DropDown label="Historical Events" name="historicalEvents" options={historicalEvents} />
            <DropDown label="Materials" name="materials" options={materials} />
            <DropDown label="Locations" name="locations" options={locations} />
            <DropDown label="Rivers" name="rivers" options={rivers} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookForm;
