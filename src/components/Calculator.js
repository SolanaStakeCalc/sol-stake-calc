import React, { useState } from 'react';
import { heliusAPYSchedule } from '../data/fetchValidators';

const Calculator = () => {
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(12);
  const [results, setResults] = useState(null);

  const calculate = () => {
    console.log("Button clicked");
    let balance = amount;

    for (let year = 0; year < years; year++) {
      const apy = heliusAPYSchedule[year] || heliusAPYSchedule[heliusAPYSchedule.length - 1];
      const monthlyRate = apy / 12;

      for (let i = 0; i < 12; i++) {
        balance += balance * monthlyRate;
      }
    }

    setResults(balance.toFixed(2));
    console.log("Final result:", balance.toFixed(2));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Solana Staking Calculator (Helius)</h2>
      <div>
        <label>SOL Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Staking Time (Years):</label>
        <input
          type="number"
          value={years}
          max="12"
          onChange={e => setYears(Number(e.target.value))}
        />
      </div>
      <button onClick={calculate} style={{ marginTop: '1rem' }}>
        Calculate
      </button>
      {results && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Projected Balance After {years} Years:</h3>
          <p>{results} SOL</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;