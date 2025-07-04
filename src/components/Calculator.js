import React, { useState } from 'react';
import { heliusAPYSchedule } from '../data/fetchValidators';

const Calculator = () => {
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(10);
  const [yearlyResults, setYearlyResults] = useState([]);

  const calculate = () => {
    let balance = amount;
    const results = [];

    for (let year = 0; year < years; year++) {
      const apy = heliusAPYSchedule[year] || heliusAPYSchedule[heliusAPYSchedule.length - 1];
      balance *= (1 + apy);
      results.push({
        year: year + 1,
        apy: apy,
        balance: balance
      });
    }

    setYearlyResults(results);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
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

      {yearlyResults.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Projected Balance Over {years} Years:</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Year</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>APY</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>Balance (SOL)</th>
              </tr>
            </thead>
            <tbody>
              {yearlyResults.map(result => (
                <tr key={result.year}>
                  <td>Year {result.year}</td>
                  <td style={{ textAlign: 'right' }}>
                    {(result.apy * 100).toFixed(2)}%
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {result.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calculator;