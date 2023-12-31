"use client";
import React, { useState, useEffect } from 'react';
import TextBox from '../TextBox';
import DropDown from '../Dropdown';
import SubmitButton from '../buttons/SubmitBtn';

interface DropDownOption {
    label: string;
    value: string;
}

const BookForm: React.FC = () => {
    const [formData, setFormData] = useState({
        bookName: '',
        author: '',
        historicalEvents: '',
        materials: '',
        locations: '',
        rivers: ''
    });
    const [authors, setAuthor] = useState<DropDownOption[]>([{label: 'Select an Author', value: ''}]);
    const [historicalEvents, setHistoricalEvent] = useState<DropDownOption[]>([{label: 'Select an Event', value: ''}]);
    const [materials, setMaterial] = useState<DropDownOption[]>([{label: 'Select a Material', value: ''}]);
    const [locations, setLocation] = useState<DropDownOption[]>([{label: 'Select a Location', value: ''}]);
    const [rivers, setRiver] = useState<DropDownOption[]>([{label: 'Select a River', value: ''}]);

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
            .then(data => setStateFunc((prevState) => [...prevState, ...data.map((item: { name: string; id: number }) => ({ label: item.name, value: item.id }))]))
            .catch(error => console.error('Error:', error));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Call API to save the book
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => console.log('Success'))
        .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextBox label="Book Name" name="bookName" value={formData.bookName} onChange={handleInputChange} />
            <DropDown label="Author" name="author" options={authors} onChange={handleInputChange}/>
            <DropDown label="Historical Events" name="historicalEvents" options={historicalEvents} onChange={handleInputChange}/>
            <DropDown label="Materials" name="materials" options={materials} onChange={handleInputChange}/>
            <DropDown label="Locations" name="locations" options={locations} onChange={handleInputChange}/>
            <DropDown label="Rivers" name="rivers" options={rivers} onChange={handleInputChange}/>
            <SubmitButton label="Submit" />
        </form>
    );
};

export default BookForm;
