"use client";
import React, { useState, useEffect } from "react";
import TextBox from "../TextBox";
import DropDown from "../Dropdown";
import SubmitButton from "../buttons/SubmitBtn";

interface DropDownOption {
  label: string;
  value: string;
}

interface BookFormProps {
  initialData?: {
    bookName?: string;
    author?: string;
    historicalEvents?: string;
    materials?: string;
    locations?: string;
    rivers?: string;
  };
}

const BookForm: React.FC<BookFormProps> = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    bookName: initialData.bookName || "",
    author: initialData.author || "",
    historicalEvents: initialData.historicalEvents || "",
    materials: initialData.materials || "",
    locations: initialData.locations || "",
    rivers: initialData.rivers || "",
  });
  const [authors, setAuthor] = useState<DropDownOption[]>([
    { label: "Select an Author", value: "" },
  ]);
  const [historicalEvents, setHistoricalEvent] = useState<DropDownOption[]>([
    { label: "Select an Event", value: "" },
  ]);
  const [materials, setMaterial] = useState<DropDownOption[]>([
    { label: "Select a Material", value: "" },
  ]);
  const [locations, setLocation] = useState<DropDownOption[]>([
    { label: "Select a Location", value: "" },
  ]);
  const [rivers, setRiver] = useState<DropDownOption[]>([
    { label: "Select a River", value: "" },
  ]);

  useEffect(() => {
    fetchData("characters", setAuthor);
    fetchData("events", setHistoricalEvent);
    fetchData("materials", setMaterial);
    fetchData("locations", setLocation);
    fetchData("rivers", setRiver);
  }, []);

  const fetchData = (
    endpoint: string,
    setStateFunc: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`)
      .then((response) => response.json())
      .then((data) =>
        setStateFunc((prevState) => [
          ...prevState,
          ...data.map((item: { name: string; id: number }) => ({
            label: item.name,
            value: item.id,
          })),
        ])
      )
      .catch((error) => console.error("Error:", error));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Call API to save the book
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextBox
        label="Book Name"
        name="bookName"
        value={formData.bookName}
        onChange={handleInputChange}
      />
      <DropDown
        label="Author"
        name="author"
        options={authors}
        value={formData.author}
        onChange={handleInputChange}
      />
      <DropDown
        label="Historical Events"
        name="historicalEvents"
        options={historicalEvents}
        value={formData.historicalEvents}
        onChange={handleInputChange}
      />
      <DropDown
        label="Materials"
        name="materials"
        options={materials}
        value={formData.materials}
        onChange={handleInputChange}
      />
      <DropDown
        label="Locations"
        name="locations"
        options={locations}
        value={formData.locations}
        onChange={handleInputChange}
      />
      <DropDown
        label="Rivers"
        name="rivers"
        options={rivers}
        value={formData.rivers}
        onChange={handleInputChange}
      />
      <SubmitButton label="Submit" />
    </form>
  );
};

export default BookForm;
