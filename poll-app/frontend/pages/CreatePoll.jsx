import React, { useState } from 'react';

export default function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollLink, setPollLink] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options }),
    });
    const data = await res.json();
    setPollLink(`http://localhost:5173/poll/${data.id}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Poll</h1>
      <input
        type="text"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
          className="border p-2 w-full mb-2"
        />
      ))}
      <button onClick={addOption} className="bg-gray-200 px-3 py-1 rounded">Add Option</button>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 ml-4 rounded">Create Poll</button>
      {pollLink && (
        <div className="mt-4">
          <p>Poll Created!</p>
          <a href={pollLink} className="text-blue-600 underline">{pollLink}</a>
        </div>
      )}
    </div>
  );
}