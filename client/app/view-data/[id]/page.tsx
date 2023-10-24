"use client";

import {useEffect, useState} from 'react';

export default function ViewData({ params }: {params: {id: string}}) {
    // TODO: Add a window to view the data in a JSON format, with three buttons to Update, Delete, and Copy to Clipboard.
    const [jsonObject, setJsonObject] = useState({});

    const handleUpdate= () => {

    }

    const handleDelete= () => {

    }

    const handleCopy= () => {

    }

    const fetchData = async () => {
        console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/view-data${params.id}`);

        const req = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${params.id}`);
        const res = await req;
        const data = await res.json();
        setJsonObject(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>View Data Page</h1>

        <div className="flex flex-col items-center justify-center">
            <code>
                <pre>{JSON.stringify(jsonObject, null, "\t")}</pre>
            </code>
        </div>

        <div className="flex items-center justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={() => handleUpdate()}>
                Update
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={() => handleDelete()}>
                Delete
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={() => handleCopy()}>
                Copy to Clipboard
            </button>
    </div>
    </div>
  )
}
