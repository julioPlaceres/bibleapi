"use client";

import { useEffect, useState } from "react";

export default function ViewData({ params }: { params: { id: string } }) {
  // TODO: Add a window to view the data in a JSON format, with three buttons to Update, Delete, and Copy to Clipboard.
  const [jsonObject, setJsonObject] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [entityType, setEntityType] = useState("books");

  const entityTypes = ["books", "characters", "locations"];

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleCopy = () => {};

  const fetchData = async () => {
    const req = fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${entityType}/${inputValue}`
    );
    const res = await req;
    const data = await res.json();
    setJsonObject(data);
  };

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // Set the input value to the id in the url
    params.id !== "0" ? setInputValue(params.id) : null;

    // Update URL with the new input value
    window.history.replaceState({}, "", `/view-data/${inputValue}`);

    fetchData();
  }, [inputValue, entityType]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center mx-2">
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="mr-2"
        >
          {entityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <h1>Type the desire ID</h1>
        <input
          type="text"
          name="id"
          id="id"
          className="mx-2"
          onInput={handleInput}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <code>
          <pre>{JSON.stringify(jsonObject, null, "\t")}</pre>
        </code>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={() => handleUpdate()}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={() => handleCopy()}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
