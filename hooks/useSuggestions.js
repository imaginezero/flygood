import { useState } from 'react';

function getSearchURL(q, n) {
  const params = new URLSearchParams({ q });
  if (n) params.set('n', Number(n));
  return `/api/search?${params.toString()}`;
}

async function fetchSuggestions(q, n) {
  const response = await fetch(getSearchURL(q, n));
  return response.ok
    ? response.json()
    : Promise.reject(new Error(response.statusText));
}

export function useSuggestions(delay) {
  const [suggestions, setSuggestions] = useState([]);
  const [timeoutID, setTimeoutID] = useState(null);
  const loadSuggestions = (q, n = 5) =>
    new Promise((resolve, reject) => {
      if (timeoutID) clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => fetchSuggestions(q, n).then(resolve, reject), delay)
      );
    }).then(setSuggestions, () => {});
  return { suggestions, loadSuggestions };
}
