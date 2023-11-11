"use client";

import React, { useEffect, useState, useCallback } from "react";
import BookForm from "../../../components/forms/Book";
import CharacterForm from "../../../components/forms/Character";

interface FormProps {
  params: {
    id: string;
    entityType: string;
  };
}

const Form: React.FC<FormProps> = ({ params }) => {
  const [formType, setFormType] = useState<string>("");
  const [bookForm, setBookForm] = useState<any>({
    bookName: "",
    author: "",
    historicalEvents: "",
    materials: "",
    locations: "",
    rivers: "",
  });

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value);
  };

  const renderForm = () => {
    switch (formType) {
      case "books":
        return <BookForm initialData={bookForm} />;
      case "characters":
        return <CharacterForm />;
      default:
        return null;
    }
  };

  const fetchData = useCallback(
    (
      endpoint: string,
      setStateFunc: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success");
          console.log(data[0]);
          setStateFunc(data[0]);
        })
        .catch((error) => console.error("Error:", error));
    },
    []
  );

  useEffect(() => {
    if (params.entityType !== "default") setFormType(params.entityType);
  }, [params.entityType]);

  useEffect(() => {
    if (formType) fetchData(formType, setBookForm);
  }, [fetchData, formType]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h2>Select a form</h2>
      <select value={formType} onChange={handleFormTypeChange}>
        <option value="">Select a form</option>
        <option value="books">Book</option>
        <option value="characters">Character</option>
      </select>
      {renderForm()}
    </div>
  );
};

export default Form;
