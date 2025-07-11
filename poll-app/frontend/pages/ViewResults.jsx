import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewResults() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/polls/${id}`)
      .then(res => res.json())
      .then(setPoll);
  }, [id]);

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Results for: {poll.question}</h1>
      {poll.options.map((opt, idx) => (
        <div key={idx} className="mb-2">
          <p>{opt.text}: {opt.votes} votes</p>
        </div>
      ))}
    </div>
  );
}