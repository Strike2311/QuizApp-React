import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VotePoll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/polls/${id}`)
      .then(res => res.json())
      .then(setPoll);
  }, [id]);

  const vote = async () => {
    await fetch(`http://localhost:5000/api/polls/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optionIndex: selected }),
    });
    navigate(`/results/${id}`);
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>
      {poll.options.map((opt, idx) => (
        <div key={idx}>
          <label className="block mb-2">
            <input type="radio" name="vote" onChange={() => setSelected(idx)} /> {opt.text}
          </label>
        </div>
      ))}
      <button disabled={selected === null} onClick={vote} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Vote
      </button>
    </div>
  );
}