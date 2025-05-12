import React, { useState, useEffect } from 'react';
import { fetchTopValidators } from '../data/fetchValidators';

const Calculator = () => {
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(12);
  const [validators, setValidators] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getValidators = async () => {
      const data = await fetchTopValidators();
      setValidators(data);
    };
    getValidators();
  }, []);

  const calculate = () => {
    const updated = validators.map(v => {
      const monthlyRate = v.apy / 12;
      const periods = years * 12;
      const finalAmount = amount * Math.pow(1 + monthlyRate, periods);
      return {
        name: v.name,
        apy: v.apy,
        final: finalAmount.toFixed(2),
      };
    });
    setResults(updated);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Solana Staking Calculator</h2>
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
          onChange={e => setYears(Number(e.target.value))}
        />
      </div>
      <button onClick={calculate} style={{ marginTop: '1rem' }}>
        Calculate
      </button>
      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Results:</h3>
          <ul>
            {results.map(r => (
              <li key={r.name}>
                <strong>{r.name}</strong> ({(r.apy * 100).toFixed(2)}% APY): {r.final} SOL
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;