"use client";
import React, { useState, useEffect } from 'react';
import TextBox from '../TextBox';
import DropDown from '../Dropdown';
import Checkbox from '../Checkbox';
import SubmitButton from '../buttons/SubmitBtn';

interface DropDownOption {
    label: string;
    value: string;
}

const CharacterForm: React.FC = () => {
    const [characterName, setCharacterName] = useState('');
    const [yearsLived, setYearsLived] = useState('');
    const [role, setRole] = useState('');
    const [nameMeaning, setNameMeaning] = useState('');
    const [married, setMarried] = useState(false);
    const [image, setImage] = useState('');
    const [otherNames, setOtherNames] = useState('');
    const [father, setFather] = useState<DropDownOption[]>([]);
    const [childrenFromFather, setChildrenFromFather] = useState<DropDownOption[]>([]);
    const [mother, setMother] = useState<DropDownOption[]>([]);
    const [childrenFromMother, setChildrenFromMother] = useState<DropDownOption[]>([]);
    const [siblings, setSiblings] = useState<DropDownOption[]>([]);
    const [spouse, setSpouse] = useState<DropDownOption[]>([]);
    const [historicalEvents, setHistoricalEvents] = useState<DropDownOption[]>([]);
    const [books, setBooks] = useState<DropDownOption[]>([]);

    // static data
    const gender = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];

    useEffect(() => {
        fetchData('characters', setFather);
        fetchData('characters', setChildrenFromFather);
        fetchData('characters', setMother);
        fetchData('characters', setChildrenFromMother);
        fetchData('characters', setSiblings);
        fetchData('characters', setSpouse);
        fetchData('events', setHistoricalEvents);
        fetchData('books', setBooks);
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
            <TextBox label="Character Name" name="name" value={characterName} onChange={e => setCharacterName(e.target.value)} />
            <DropDown label='Gender' name='gender' options={gender} />
            <TextBox label="Years Lived" name="yearsLived" value={yearsLived} onChange={e => setYearsLived(e.target.value)} />
            <TextBox label="Role" name="role" value={role} onChange={e => setRole(e.target.value)} />
            <TextBox label="Name Meaning" name="nameMeaning" value={nameMeaning} onChange={e => setNameMeaning(e.target.value)} />
            <Checkbox label="Married" name="married" onChange={e => setMarried(e.target.checked)} />
            <TextBox label="Image" name="image" value={image} onChange={e => setImage(e.target.value)} />
            <TextBox label="Other Names" name="otherNames" value={otherNames} onChange={e => setOtherNames(e.target.value)} />
            <DropDown label="Father" name="father" options={father} />
            <DropDown label="Children from Father" name="childrenFromFather" options={childrenFromFather} />
            <DropDown label="Mother" name="mother" options={mother} />
            <DropDown label="Children from Mother" name="childreFromMother" options={childrenFromMother} />
            <DropDown label="Siblings" name="siblings" options={siblings} />
            <DropDown label="Spouse" name="spouse" options={spouse} />
            <DropDown label="Events" name="events" options={historicalEvents} />
            <DropDown label="Books" name="books" options={books} />
            <SubmitButton label="submit"/>
        </form>
    );
};

export default CharacterForm;
