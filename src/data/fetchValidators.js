import axios from 'axios';

const fallbackValidators = [
  { name: "Validator A", apy: 0.105, commission: 0 },
  { name: "Validator B", apy: 0.102, commission: 0 },
  { name: "Validator C", apy: 0.097, commission: 0 }
];

export async function fetchTopValidators(limit = 3) {
  try {
    const response = await axios.get('https://api.stakewiz.com/validators');
    const validators = response.data;

    const trusted = validators
      .filter(v =>
        v.apy_estimate > 0 &&
        v.total_active_stake > 500000 &&
        v.score > 80
      )
      .sort((a, b) => b.apy_estimate - a.apy_estimate)
      .slice(0, limit)
      .map(v => ({
        name: v.name || v.identity,
        apy: v.apy_estimate / 100,
        commission: v.commission,
      }));

    return trusted.length ? trusted : fallbackValidators;
  } catch (error) {
    console.error('Error fetching trusted validators:', error);
    return fallbackValidators;
  }
}