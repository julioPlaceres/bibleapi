"use client";
import React, { useState, useEffect } from 'react';
import TextBox from '../TextBox';
import DropDown from '../Dropdown';

interface DropDownOption {
    label: string;
    value: string;
}

const BookForm: React.FC = () => {
    const [bookName, setBookName] = useState('');
    const [authors, setAuthor] = useState<DropDownOption[]>([]);
    const [historicalEvents, setHistoricalEvent] = useState<DropDownOption[]>([]);
    const [materials, setMaterial] = useState<DropDownOption[]>([]);
    const [locations, setLocation] = useState<DropDownOption[]>([]);
    const [rivers, setRiver] = useState<DropDownOption[]>([]);

    useEffect(() => {
        fetchData('characters', setAuthor);
        fetchData('events', setHistoricalEvent);
        fetchData('materials', setMaterial);
        fetchData('locations', setLocation);
        fetchData('rivers', setRiver);
    }, []);

    const fetchData = (endpoint: string, setStateFunc: React.Dispatch<React.SetStateAction<any[]>>) => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`)
        .then(response => response.json())
        .then(data => setStateFunc(data.map((item: { name: string; id: number }) => ({ label: item.name, value: item.id }))))
        .catch(error => console.error('Error:', error));
    }

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
